import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.result.content }]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-xl font-bold mb-4 text-center text-blue-600">💬 ระบบแชท GPT ภาษาไทย</h1>
      <div className="border rounded p-3 h-[400px] overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          className="flex-grow border rounded-l px-3 py-2"
          placeholder="พิมพ์ข้อความที่นี่..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          ส่ง
        </button>
      </div>
    </div>
  );
}
