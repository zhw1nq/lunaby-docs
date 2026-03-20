import { CodeBlock } from "@/components/code-block";
import { ParamTable } from "@/components/param-table";

const CLIENT_OPTIONS = [
    { name: "apiKey", type: "string", description: "API key. Mặc định đọc từ process.env.LUNABY_API_KEY." },
    { name: "baseURL", type: "string", description: "Base URL của API.", default: "https://api.lunie.dev/v1" },
    { name: "timeout", type: "number", description: "Timeout mỗi request (ms).", default: "120000" },
    { name: "maxRetries", type: "number", description: "Số lần retry tối đa.", default: "2" },
    { name: "defaultModel", type: "Model", description: "Model dùng khi không truyền model.", default: "lunaby-pro" },
    { name: "defaultHeaders", type: "Record<string, string>", description: "Headers thêm vào mọi request." },
    { name: "fetch", type: "FetchFunction", description: "Custom fetch implementation (optional)." },
];

export default function SDKReferencePage() {
    return (
        <div className="prose">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">SDK Reference</p>
            <h1>SDK Overview</h1>
            <p>
                <code>lunaby-sdk</code> là TypeScript-first SDK với full type definitions, ESM + CJS support,
                streaming với async iterators và comprehensive error handling.
            </p>

            <h2>Installation</h2>
            <CodeBlock language="bash" code={`npm install lunaby-sdk`} />

            <h2>Client Options</h2>
            <ParamTable params={CLIENT_OPTIONS} />

            <h2>client.chat.create()</h2>
            <CodeBlock
                language="typescript"
                code={`// Signature
create(
  messages: ChatMessage[],
  options?: CreateChatCompletionOptions
): Promise<ChatResponse<ChatCompletionResponse>>

// Ví dụ
const res = await client.chat.create(messages, {
  model: 'lunaby-pro',
  max_tokens: 1024,
  temperature: 0.7,
  signal: abortController.signal, // optional
  timeout: 30000,                  // optional override
});

// Access data
res.data.choices[0].message.content
res.data.usage.total_tokens
res.status        // HTTP status code
res.getHeader('x-request-id')
res.getRateLimitInfo()  // { limit, remaining, reset }`}
            />

            <h2>client.chat.stream()</h2>
            <CodeBlock
                language="typescript"
                code={`// Async generator — cách đơn giản nhất
for await (const chunk of client.chat.stream(messages, options)) {
  const content = chunk.choices[0].delta.content;
  if (content) process.stdout.write(content);
}`}
            />

            <h2>client.chat.createStream()</h2>
            <CodeBlock
                language="typescript"
                code={`// Trả về ChatStream object với nhiều method
const stream = await client.chat.createStream(messages, options);

// Properties
stream.fullContent  // string — accumulated content
stream.usage        // TokenUsage | undefined

// Methods
stream.abort()                    // Hủy stream
await stream.toContent()          // Collect toàn bộ → string
await stream.toArray()            // Collect toàn bộ → ChatCompletionChunk[]
await stream.process({ onContent, onDone, onError, onChunk })`}
            />

            <h2>client.images.generate()</h2>
            <CodeBlock
                language="typescript"
                code={`const res = await client.images.generate(prompt, {
  model: 'lunaby-vision',
  aspect_ratio: '16:9',  // '1:1'|'16:9'|'9:16'|'4:3'|'3:4'|'21:9'
  output_format: 'png',  // 'png'|'jpeg'|'webp'
  seed: 42,
  negative_prompt: 'blurry',
});

res.data.data[0].b64_json       // base64 string
res.data.data[0].revised_prompt // enhanced prompt`}
            />

            <h2>client.images.generateBuffer()</h2>
            <CodeBlock
                language="typescript"
                code={`// Shortcut trả thẳng về Buffer (Node.js)
const { buffer, revisedPrompt, usage } = await client.images.generateBuffer(
  prompt,
  options
);

import fs from 'fs';
fs.writeFileSync('output.png', buffer);`}
            />

            <h2>TypeScript Types</h2>
            <CodeBlock
                language="typescript"
                code={`import type {
  // Messages
  ChatMessage,           // { role, content, name? }
  MessageRole,           // 'system' | 'user' | 'assistant'

  // Requests
  ChatCompletionRequest,
  ImageGenerationRequest,

  // Responses
  ChatCompletionResponse,
  ChatCompletionChunk,
  ImageGenerationResponse,
  ImageData,
  TokenUsage,

  // Config
  Model,        // 'lunaby-pro' | 'lunaby-reasoning' | 'lunaby-vision' | string
  AspectRatio,  // '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '21:9'
  OutputFormat, // 'png' | 'jpeg' | 'webp'
  LunabyClientOptions,
  RequestOptions,
} from 'lunaby-sdk';`}
            />

            <h2>Environment Variables</h2>
            <CodeBlock
                language="bash"
                filename=".env"
                code={`LUNABY_API_KEY=your_api_key_here
LUNABY_BASE_URL=https://api.lunie.dev/v1   # optional`}
            />
        </div>
    );
}