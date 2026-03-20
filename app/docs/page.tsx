import { CodeBlock } from "@/components/code-block";
import { DocsHeader } from "@/components/docs-header";

export default function DocsPage() {
    return (
        <div className="prose">
            <DocsHeader section="Overview" title="Introduction" />
            <p>
                Lunaby API là REST API proxy kết nối tới các model AI, hỗ trợ chat completions,
                image generation và hệ thống quản trị API key. API tuân theo chuẩn OpenAI-compatible.
            </p>

            <h2>Base URL</h2>
            <CodeBlock code="https://api.lunie.dev/v1" language="bash" />

            <h2>SDK chính thức</h2>
            <p>Cài đặt SDK TypeScript/JavaScript:</p>
            <CodeBlock code={`npm install lunaby-sdk\n# hoặc\nyarn add lunaby-sdk\npnpm add lunaby-sdk`} language="bash" />

            <h2>Tài nguyên</h2>
            <div className="grid grid-cols-2 gap-3 not-prose mt-4">
                {[
                    { title: "Quick Start", desc: "Chạy request đầu tiên trong 2 phút", href: "/docs/quickstart" },
                    { title: "Chat API", desc: "Tạo chat completions với models AI", href: "/docs/chat" },
                    { title: "Image API", desc: "Sinh ảnh từ text prompt", href: "/docs/images" },
                    { title: "SDK Reference", desc: "Full TypeScript SDK docs", href: "/docs/sdk-reference" },
                ].map((card) => (
                    <a key={card.href} href={card.href}
                        className="block p-4 rounded-lg border hover:border-cyan-300 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 transition-all group">
                        <p className="font-semibold text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">{card.title} →</p>
                        <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}