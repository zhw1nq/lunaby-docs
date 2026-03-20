import { CodeBlock } from "@/components/code-block";
import { EndpointBadge } from "@/components/endpoint-badge";
import { DocsHeader } from "@/components/docs-header";

export default function StreamingPage() {
    return (
        <div className="prose">
            <DocsHeader section="Core API" title="Streaming" />
            <p>
                Khi <code>stream: true</code>, server gửi response dưới dạng <strong>Server-Sent Events (SSE)</strong>.
                SDK cung cấp 3 cách xử lý stream.
            </p>

            <EndpointBadge method="POST" path="/v1/chat/completions" />

            <h2>Cách 1 - Async Iterator (đơn giản nhất)</h2>
            <CodeBlock
                filename="stream-iterator.ts"
                language="typescript"
                code={`for await (const chunk of client.chat.stream([
  { role: 'user', content: 'Kể một câu chuyện ngắn' }
])) {
  const content = chunk.choices[0].delta.content;
  if (content) process.stdout.write(content);
}`}
            />

            <h2>Cách 2 - Callbacks</h2>
            <CodeBlock
                filename="stream-callbacks.ts"
                language="typescript"
                code={`const stream = await client.chat.createStream([
  { role: 'user', content: 'Đếm từ 1 đến 10' }
]);

await stream.process({
  onChunk: (chunk) => {
    // Nhận toàn bộ chunk object
  },
  onContent: (content, accumulated) => {
    process.stdout.write(content);
  },
  onDone: (fullContent, usage) => {
    console.log('\\nTokens:', usage?.total_tokens);
  },
  onError: (error) => {
    console.error('Stream error:', error);
  }
});`}
            />

            <h2>Cách 3 - Collect toàn bộ</h2>
            <CodeBlock
                language="typescript"
                code={`const stream = await client.chat.createStream([
  { role: 'user', content: 'Tóm tắt lịch sử Việt Nam' }
]);

// Chờ đến khi stream hoàn tất
const fullContent = await stream.toContent();
console.log(fullContent);

// Hoặc lấy dạng array chunks
const chunks = await stream.toArray();`}
            />

            <h2>Abort Stream</h2>
            <CodeBlock
                language="typescript"
                code={`const stream = await client.chat.createStream(messages);

// Hủy stream bất kỳ lúc nào
setTimeout(() => stream.abort(), 3000);

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content ?? '');
}`}
            />

            <h2>Raw SSE (cURL)</h2>
            <CodeBlock
                language="bash"
                code={`curl https://api.lunie.dev/v1/chat/completions \\
  -H "Authorization: Bearer $LUNABY_API_KEY" \\
  -H "Content-Type: application/json" \\
  --no-buffer \\
  -d '{
    "model": "lunaby-pro",
    "messages": [{ "role": "user", "content": "Hello!" }],
    "stream": true
  }'`}
            />
            <CodeBlock
                language="text"
                code={`data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":"Hello"},"index":0}]}

data: {"id":"chatcmpl-abc","object":"chat.completion.chunk","choices":[{"delta":{"content":"!"},"index":0}]}

data: [DONE]`}
            />
        </div>
    );
}