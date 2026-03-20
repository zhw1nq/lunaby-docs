import { CodeBlock } from "@/components/code-block";
import { DocsHeader } from "@/components/docs-header";
import { cn } from "@/lib/utils";

const MODELS = [
    {
        id: "lunaby",
        label: "Lunaby",
        tag: "Default",
        tagColor: "cyan",
        desc: "Model mặc định cho chat tổng quát. Cân bằng tốt giữa tốc độ và chất lượng.",
        useCase: "Chatbot, Q&A, summarization, translation",
    },
    {
        id: "lunaby-pro",
        label: "Lunaby Pro",
        tag: "Advanced",
        tagColor: "blue",
        desc: "Model tối ưu cho bài toán phức tạp, lập luận nhiều bước.",
        useCase: "Math, coding, logic, step-by-step analysis",
    },
    {
        id: "lunaby-vision",
        label: "Lunaby Vision",
        tag: "Image",
        tagColor: "pink",
        desc: "Model sinh ảnh từ text prompt.",
        useCase: "Image generation, creative visuals",
    },
];

const TAG_COLORS: Record<string, string> = {
    cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    pink: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
};

export default function ModelsPage() {
    return (
        <div className="prose">
            <DocsHeader section="Core API" title="Models" />
            <p>Lunaby API cung cấp 3 models. Dùng <code>model</code> parameter để chọn.</p>

            <div className="not-prose space-y-3 my-6">
                {MODELS.map((m) => (
                    <div key={m.id} className="rounded-lg border p-4 hover:border-cyan-300 transition-colors">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <code className="text-sm font-semibold font-mono">{m.id}</code>
                                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", TAG_COLORS[m.tagColor])}>
                                        {m.tag}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">{m.desc}</p>
                                <p className="text-xs text-muted-foreground/70">Use case: {m.useCase}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Lấy danh sách models</h2>
            <CodeBlock
                language="bash"
                code={`curl https://api.lunie.dev/v1/chat/models \\
  -H "Authorization: Bearer $LUNABY_API_KEY"`}
            />
            <CodeBlock
                language="json"
                code={`{
  "object": "list",
  "data": [
    { "id": "lunaby",         "object": "model", "owned_by": "s4ory" },
    { "id": "lunaby-pro",     "object": "model", "owned_by": "s4ory" },
    { "id": "lunaby-vision",  "object": "model", "owned_by": "s4ory" }
  ]
}`}
            />
        </div>
    );
}