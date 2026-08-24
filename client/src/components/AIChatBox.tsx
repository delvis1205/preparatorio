import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AIChatBoxProps = {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  height?: string | number;
  emptyStateMessage?: string;
  suggestedPrompts?: string[];
};

export function AIChatBox({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Escreva a sua mensagem…",
  className,
  height = "600px",
  emptyStateMessage = "Comece uma conversa com o LUANDA AI.",
  suggestedPrompts,
}: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const visibleMessages = messages.filter((message) => message.role !== "system");
  const send = (content: string) => {
    const normalized = content.trim();
    if (!normalized || isLoading) return;
    onSendMessage(normalized);
    setInput("");
  };
  const submit = (event: React.FormEvent) => { event.preventDefault(); send(input); };

  return (
    <div className={cn("flex flex-col bg-card text-card-foreground", className)} style={{ height }}>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {visibleMessages.length ? visibleMessages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
            {message.role === "assistant" && <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Sparkles className="h-3.5 w-3.5" /></span>}
            <div className={cn("max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
              {message.content}
            </div>
            {message.role === "user" && <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"><User className="h-3.5 w-3.5" /></span>}
          </div>
        )) : (
          <div className="grid h-full place-items-center text-center"><div className="max-w-md"><Sparkles className="mx-auto h-10 w-10 text-primary" /><p className="mt-3 text-sm text-muted-foreground">{emptyStateMessage}</p>{suggestedPrompts?.length ? <div className="mt-5 flex flex-wrap justify-center gap-2">{suggestedPrompts.map((prompt) => <button key={prompt} type="button" disabled={isLoading} onClick={() => send(prompt)} className="rounded-xl border border-border px-3 py-2 text-xs font-bold text-primary hover:bg-accent disabled:opacity-50">{prompt}</button>)}</div> : null}</div></div>
        )}
        {isLoading && <div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary"><Sparkles className="h-3.5 w-3.5" /></span><span className="rounded-2xl bg-muted px-4 py-3"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></span></div>}
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-border bg-background/70 p-4">
        <Textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(input); } }} placeholder={placeholder} className="min-h-10 resize-none rounded-xl" rows={1} />
        <Button type="submit" size="icon" disabled={!input.trim() || isLoading} className="h-10 w-10 shrink-0 rounded-xl"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
}
