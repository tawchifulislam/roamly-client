'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendChatMessage } from '@/lib/api';
import { ChatMessage } from '@/types/chat';
import { useSession } from '@/lib/auth-client';

const initialPrompts = [
  'Suggest a beach trip',
  "What's the cheapest package?",
  'Plan a 3-day trip for me',
];

export default function ChatWidget() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await sendChatMessage(messageText, conversationId);
      setConversationId(data.conversationId);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply, followUps: data.followUps },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const lastMessage = messages[messages.length - 1];
  const showFollowUps =
    !isTyping &&
    lastMessage?.role === 'assistant' &&
    (lastMessage.followUps?.length ?? 0) > 0;

  if (!session) return null;

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
        />
      )}

      {isOpen && (
        <div
          className="fixed z-50 bg-white flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-2xl
          bottom-21 right-3 left-3 h-[70vh] max-h-140
          sm:left-auto sm:right-5 sm:w-96 sm:h-130"
        >
          <div className="bg-linear-to-r from-teal-700 to-teal-800 text-white px-4 py-3.5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Sparkles size={15} />
              </span>
              <div>
                <p className="font-heading font-semibold text-sm leading-none">
                  Roamly AI
                </p>
                <p className="text-[11px] text-teal-100 mt-1">
                  Trip planning assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 text-center py-2">
                  Ask me anything about planning your trip
                </p>
                {initialPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 hover:border-teal-700 hover:bg-teal-50 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-teal-700 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {showFollowUps && (
              <div className="flex flex-col gap-1.5 pt-1">
                {lastMessage.followUps!.map(followUp => (
                  <button
                    key={followUp}
                    onClick={() => handleSend(followUp)}
                    className="self-start text-xs border border-teal-200 text-teal-700 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
                  >
                    {followUp}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3.5 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 p-2.5 sm:p-3 flex gap-2 shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 min-w-0 text-sm border border-gray-200 rounded-lg px-3 sm:px-3.5 py-2.5 outline-none focus:border-teal-700"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-colors disabled:opacity-40 shrink-0"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
