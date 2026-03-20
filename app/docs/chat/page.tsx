import { CodeBlock } from "@/components/code-block";
import { ParamTable } from "@/components/param-table";
import { EndpointBadge } from "@/components/endpoint-badge";

const REQUEST_PARAMS = [
    { name: "messages", type: "ChatMessage[]", required: true, description: "Mảng messages. Mỗi item có role ('system' | 'user' | 'assistant') và content (string)." },
    { name: "model", type: "string", description: "ID model cần dùng.", default: "lunaby-pro" },
    { name: "max_tokens", type: "integer", description: "Số token tối đa trong response." },
    { name: "temperature", type: "float", description: "Độ sáng tạo từ 0 đến 2. Càng cao càng ngẫu nhiên.", default: "1" },
    { name: "top_p", type: "float", description: "Nucleus sampling. Thay thế cho temperature.", default: "1" },
    { name: "stream", type: "boolean", description: "Bật streaming SSE response.", default: "false" },
    { name: "stop", type: "string | string[]", description: "Chuỗi hoặc mảng chuỗi để dừng generation." },
    { name: "presence_penalty", type: "float", description: "Phạt token đã xuất hiện, -2.0 đến 2.0.", default: "0" },
    { name: "frequency_penalty", type: "float", description: "Phạt token xuất hiện nhiều, -2.0 đến 2.0.", default: "0" },
    { name: "user", type: "string", description: "ID user để tracking." },
];

export default function ChatPage() {
    return (
        <div className="prose">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-2">Core API</p>
            <h1>Chat Completions</h1>
            <p>
                Tạo model response từ một đoạn hội thoại. Hỗ trợ cả non-streaming lẫn
                streaming (SSE). Yêu cầu xác thực bằng API key.
            </p>

            <EndpointBadge method="POST" path="/v1/chat/completions" />

            <h2>Request Parameters</h2>
            <ParamTable params={REQUEST_PARAMS} />

            <h2>Ví dụ - Non-streaming</h2>
            <CodeBlock
                filename="chat.ts"
                language="typescript"
                code={`import Lunaby from 'lunaby-sdk';

const client = new Lunaby({ apiKey: process.env.LUNABY_API_KEY });

const response = await client.chat.create([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'TypeScript là gì?' }
], {
  model: 'lunaby-pro',
  temperature: 0.7,
  max_tokens: 1024,
});

console.log(response.data.choices[0].message.content);
console.log('Tokens:', response.data.usage.total_tokens);`}
            />

            <h2>Ví dụ - cURL</h2>
            <CodeBlock
                language="bash"
                code={`curl https://api.lunie.dev/v1/chat/completions \\
  -H "Authorization: Bearer $LUNABY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "lunaby-pro",
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user", "content": "TypeScript là gì?" }
    ],
    "temperature": 0.7
  }'`}
            />

            <h2>Response</h2>
            <CodeBlock
                language="json"
                code={`{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1742500000,
  "model": "lunaby-pro",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "TypeScript là ngôn ngữ..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}`}
            />

            <h2>Multi-turn Conversation</h2>
            <CodeBlock
                filename="conversation.ts"
                language="typescript"
                code={`import type { ChatMessage } from 'lunaby-sdk';

const messages: ChatMessage[] = [
  { role: 'system', content: 'You are a math tutor.' }
];

// Turn 1
messages.push({ role: 'user', content: '2 + 2 bằng bao nhiêu?' });
let res = await client.chat.create(messages);
const answer1 = res.data.choices[0].message.content;
messages.push({ role: 'assistant', content: answer1 });

// Turn 2
messages.push({ role: 'user', content: 'Nhân kết quả đó với 3?' });
res = await client.chat.create(messages);
console.log(res.data.choices[0].message.content);`}
            />
        </div>
    );
}