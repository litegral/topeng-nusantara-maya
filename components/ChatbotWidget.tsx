"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 shadow-elevated flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Asisten Maltopia</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-muted rounded-lg p-3 mb-4 animate-fade-in">
              <p className="text-sm">
                Selamat datang! Saya siap membantu Anda menjelajahi dunia Topeng Malangan. 
                Tanyakan apa saja tentang sejarah, makna, atau cerita di balik topeng-topeng tradisional ini.
              </p>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-4">
              <p>Ditenagai oleh teknologi RAG</p>
            </div>
          </div>
          
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ketik pertanyaan Anda..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled
            />
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-elevated bg-linear-to-br from-terracotta to-gold hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatbotWidget;