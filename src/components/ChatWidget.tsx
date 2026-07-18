'use client';

import { useState, useRef, useEffect } from 'react';
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
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-80 h-96 bg-white border rounded-xl shadow-xl flex flex-col overflow-hidden">
          <div className="bg-teal-700 text-white px-4 py-3 flex justify-between items-center">
            <p className="font-medium text-sm">Roamly AI Assistant</p>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg leading-none"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-400 text-center">
                  Ask me anything about planning your trip
                </p>
                {initialPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs border rounded-lg px-3 py-2 hover:bg-gray-50"
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
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
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
                    className="self-start text-xs border border-teal-200 text-teal-700 rounded-full px-3 py-1.5 hover:bg-teal-50"
                  >
                    {followUp}
                  </button>
                ))}
              </div>
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-2 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 text-sm border rounded-lg px-3 py-2 outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping}
              className="bg-teal-700 text-white rounded-lg px-3 text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 rounded-full bg-teal-700 text-white shadow-lg flex items-center justify-center text-2xl"
      >
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
}
