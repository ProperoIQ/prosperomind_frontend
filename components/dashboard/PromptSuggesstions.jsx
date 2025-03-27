import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export default function PromptSuggestions({ matchedPrompts, onSelect }) {
  if (!matchedPrompts.length) return null

  return (
    <Card className="absolute bottom-[calc(100%+8px)] left-4 right-4 p-2 shadow-lg z-10">
      <ScrollArea className="max-h-[200px]">
        <div className="space-y-1">
          {matchedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left h-auto py-2 px-3 text-sm"
              onClick={() => onSelect(prompt)}
            >
              {prompt.prompt_text} {/* ✅ Display only the `prompt_text`, not the whole object */}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
