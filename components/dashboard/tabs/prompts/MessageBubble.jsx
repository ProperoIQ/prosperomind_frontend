import { User, Bot } from "lucide-react";

export default function MessageBubble({ role, message, contentData, onClick }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${role === "user" ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          role === "user" ? "bg-blue-500" : "bg-gray-200"
        }`}>
          {role === "user" ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-700" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`p-3 rounded-lg ${
            role === "user" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 text-gray-800"
          } transition-all hover:shadow-sm cursor-pointer`}
          onClick={onClick}
        >
          {message === "See Results" ? (
            <button className="text-blue-600 underline">See Results</button>
          ) : (
            <p className="break-words">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}