export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  followUps?: string[];
}
