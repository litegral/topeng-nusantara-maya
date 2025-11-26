"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Message {
  role: "user" | "model";
  text: string;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, parts: m.text })),
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: data.response },
        ]);
      } else {
        console.error("No response data");
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Maaf, terjadi kesalahan saat memproses permintaan Anda." },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Maaf, terjadi kesalahan koneksi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[380px] h-[550px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 border-2 border-primary/20 p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-md">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                <Bot className="h-4 w-4 text-gold" />
              </div>
              <div>
                <span className="font-bold text-sm block">Asisten Maltopia</span>
                <span className="text-[10px] text-white/80 font-light flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online • AI Powered
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-white/20 text-primary-foreground rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent bg-muted/10">
            <div className="bg-card/80 border border-border/50 rounded-xl p-4 animate-fade-in shadow-sm backdrop-blur-sm mx-2 mt-2">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-primary">Asisten AI</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Selamat datang! Saya siap membantu Anda menjelajahi dunia Topeng Malangan.
                    Tanyakan apa saja tentang sejarah, makna, atau cerita di balik topeng-topeng tradisional ini.
                  </p>
                </div>
              </div>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {msg.role === "model" && (
                  <div className="w-6 h-6 rounded-full bg-linear-to-br from-terracotta to-gold flex items-center justify-center shrink-0 shadow-sm mb-1">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm whitespace-pre-wrap break-words ${msg.role === "user"
                    ? "bg-linear-to-br from-primary to-primary/90 text-primary-foreground rounded-br-sm"
                    : "bg-white dark:bg-card border border-border/50 text-card-foreground rounded-bl-sm shadow-md"
                    }`}
                >
                  {msg.text}
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mb-1">
                    <User className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-terracotta to-gold flex items-center justify-center shrink-0 shadow-sm mb-1">
                  <Bot className="h-3 w-3 text-white" />
                </div>
                <div className="bg-white dark:bg-card border border-border/50 rounded-2xl rounded-bl-sm p-4 shadow-md">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-background/95 backdrop-blur-sm rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center text-[10px] text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              <p>Ditenagai oleh teknologi RAG</p>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-elevated bg-linear-to-br from-terracotta to-gold hover:scale-110 transition-transform group"
        >
          <Bot className="h-6 w-6 group-hover:hidden" />
          <Sparkles className="h-6 w-6 hidden group-hover:block animate-pulse" />
        </Button>
      )}
    </div>
  );
};

export default ChatbotWidget;