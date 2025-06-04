import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'คุณกำลังคุยกับ GPT-4 ภาษาไทย' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.result.content }]);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">💬 ระบบแชท GPT ภาษาไทย</h1>
      <div className="border rounded p-3 h-[400px] overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500 mt-2">กำลังพิมพ์...</div>}
      </div>

      <div className="mt-4 flex">
