import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import PromptSuggestions from "../../PromptSuggesstions";
import { runPrompt2 } from "@/services";
import ResultModal from "../../ResultsView/ResultModal";

export default function ChatInterface({ prompts, boardId }) {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [inputValueMatchedPandasPrompt, setInputValueMatchedPandasPrompt] = useState("");
  const [matchedPrompts, setMatchedPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!inputValue.trim()) {
      setMatchedPrompts([]);
      return;
    }

    setMatchedPrompts(
      prompts
        .filter((p) =>
          p.prompt_text?.toLowerCase().includes(inputValue.toLowerCase())
        )
        .slice(0, 5)
    );
  }, [inputValue, prompts]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    let pandasPromptToSend = inputValueMatchedPandasPrompt;

    if (!pandasPromptToSend) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        { role: "system", content: "You are a helpful AI that suggests pandas code." },
                        { role: "user", content: `Find the best-matched pandas code for: "${inputValue}". Available prompts:\n${prompts.map(p => `- ${p.prompt_text}: ${p.prompt_out}`).join("\n")}` }
                    ],
                    max_tokens: 200,
                }),
            });

            const data = await response.json();
            let rawResponse = data.choices?.[0]?.message?.content || "";

            const match = rawResponse.match(/```python\s*([\s\S]*?)\s*```/);
            pandasPromptToSend = match ? match[1] : rawResponse;

            console.log("Extracted pandas code:", pandasPromptToSend);
        } catch (error) {
            console.error("Failed to fetch best-matched pandas prompt:", error);
            pandasPromptToSend = ""; // Fallback
        }
    }

    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
    setLoading(true);

    try {
        const response = await runPrompt2(inputValue, boardId, pandasPromptToSend);
        console.log("API Response:", response.data);

        let botResponse = response.data || { message: "", table: null };

        const hasStructuredData =
            (botResponse.table && Object.keys(botResponse.table).length > 0) ||
            (botResponse.charts && botResponse.charts.length > 0);

        let botMessage = hasStructuredData
            ? "See Results"
            : Array.isArray(botResponse.message)
            ? botResponse.message.join("\n")
            : botResponse.message || "No response from server.";

        // Handle cases where message is empty
        if (!botResponse.message || (Array.isArray(botResponse.message) && botResponse.message.length === 0)) {
            botResponse.message = ["No meaningful response received."];
        }

        // Check if table data exists and generate insights
        if (botResponse.table && botResponse.table.data && botResponse.table.data.length > 0) {
            console.log("Generating insights on table data...");
            try {
                const insightsResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "gpt-4",
                        messages: [
                            { role: "system", content: "You are a data analyst. Provide key insights on the given dataset, including trends, anomalies, and patterns." },
                            { role: "user", content: `Analyze the following table and generate insights:\n${JSON.stringify(botResponse.table.data)}` },
                        ],
                        max_tokens: 200,
                    }),
                });

                const insightsData = await insightsResponse.json();
                const insights = insightsData.choices?.[0]?.message?.content || "No insights generated.";

                botResponse.message = [insights]; // Store insights as an array for MessagesTab
            } catch (error) {
                console.error("Failed to generate insights:", error);
                botResponse.message = ["No insights available."];
            }
        }

        setMessages((prev) => [
            ...prev,
            {
                role: "bot",
                content: hasStructuredData ? "See Results" : botResponse.message.join("\n") || "No response from server.",
                contentData: botResponse,
            },
        ]);

        if (hasStructuredData || botResponse.message.length > 0) {
            setSelectedResult(botResponse);
        }
    } catch (error) {
        console.error("Error in fetching response:", error);
        setMessages((prev) => [...prev, { role: "bot", content: "Failed to fetch response." }]);
    }

    setLoading(false);
    setInputValue("");
};


  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-14rem)] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, idx) => {
            const messageText =
              typeof msg.content === "string"
                ? msg.content
                : msg.content?.message || JSON.stringify(msg.content, null, 2);

            return (
              <MessageBubble
                key={idx}
                role={msg.role}
                message={messageText}
                contentData={msg.contentData} // Pass contentData to MessageBubble
                onClick={() => {
                  if (msg.contentData?.table || msg.contentData?.charts) {
                    setSelectedResult(msg.contentData);
                    setIsModalOpen(true);
                  }
                }}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4 relative">
        <PromptSuggestions
          matchedPrompts={matchedPrompts}
          onSelect={(selectedPrompt) => {
            setInputValue(selectedPrompt.prompt_text);
            setInputValueMatchedPandasPrompt(selectedPrompt.prompt_out);
          }}
        />

        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setInputValueMatchedPandasPrompt("");
            }}
            
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || loading}
          >
            {loading ? "Loading..." : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <ResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          result={selectedResult}
          boardId={boardId}
        />
      )}
    </div>
  );
}
