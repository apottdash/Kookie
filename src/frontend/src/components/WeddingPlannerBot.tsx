import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Namaste! 💍 I'm VowGuide, your AI wedding planning assistant from VowVoyage. I'm here to help you plan your dream Indian wedding — from vendor budgets to ceremony timelines.\n\nTell me — what stage of planning are you at? Or ask me anything about venues, photographers, mehendi, catering, or destination weddings! 🌸",
};

export default function WeddingPlannerBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full gradient-purple shadow-elevated flex items-center justify-center hover:shadow-hover transition-smooth group"
            aria-label="Open wedding planner AI"
            data-ocid="bot.toggle_button"
          >
            <Sparkles className="w-6 h-6 text-primary-foreground group-hover:scale-110 transition-smooth" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 md:bottom-6 right-4 z-50 w-[340px] sm:w-[380px] bg-card border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden"
            style={{ maxHeight: "520px" }}
            data-ocid="bot.chat_panel"
          >
            {/* Header */}
            <div className="gradient-purple p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold text-sm leading-tight">
                    VowGuide
                  </p>
                  <p className="text-primary-foreground/70 text-[10px]">
                    AI Wedding Planner · VowVoyage
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-smooth"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full gradient-purple flex items-center justify-center mr-2 shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-6 h-6 rounded-full gradient-purple flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border shrink-0">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about venues, budget, traditions…"
                  className="text-sm rounded-full"
                  disabled={loading}
                  data-ocid="bot.input"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="rounded-full w-9 h-9 shrink-0 gradient-purple"
                  data-ocid="bot.send_button"
                >
                  <Send className="w-3.5 h-3.5 text-primary-foreground" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-1.5">
                Powered by Claude AI · VowVoyage
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
