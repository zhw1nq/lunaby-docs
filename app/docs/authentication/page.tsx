import { CodeBlock } from "@/components/code-block";

export default function AuthenticationPage() {
    return (
        <div className="prose">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">Getting Started</p>
            <h1>Authentication</h1>
            <p>
                Lunaby API dùng <strong>Bearer Token</strong> để xác thực. Mọi request tới{" "}
                <code>/v1/</code> đều phải có header <code>Authorization</code>.
            </p>

            <h2>API Key</h2>
            <CodeBlock
                language="http"
                code={`Authorization: Bearer YOUR_API_KEY`}
            />
            <p>
                API key được tạo qua Admin Dashboard. Key không có thời hạn hết hạn nhưng
                có thể bị deactivate hoặc xóa bởi admin bất kỳ lúc nào.
            </p>

            <h2>Biến môi trường</h2>
            <p>SDK tự động đọc từ environment variables:</p>
            <CodeBlock
                language="bash"
                filename=".env"
                code={`LUNABY_API_KEY=your_api_key_here
LUNABY_BASE_URL=https://api.lunie.dev/v1   # optional`}
            />

            <h2>Truyền trực tiếp</h2>
            <CodeBlock
                language="typescript"
                code={`const client = new Lunaby({
  apiKey: 'your-api-key',   // hoặc process.env.LUNABY_API_KEY
});`}
            />

            <h2>Lỗi Authentication</h2>
            <div className="not-prose rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-muted border-b">
                            <th className="text-left px-4 py-2 text-xs text-muted-foreground font-semibold">HTTP Code</th>
                            <th className="text-left px-4 py-2 text-xs text-muted-foreground font-semibold">Nguyên nhân</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr><td className="px-4 py-2.5 font-mono text-xs text-red-500">401</td><td className="px-4 py-2.5 text-xs text-muted-foreground">Thiếu hoặc sai API key</td></tr>
                        <tr><td className="px-4 py-2.5 font-mono text-xs text-orange-500">403</td><td className="px-4 py-2.5 text-xs text-muted-foreground">Key bị deactivate</td></tr>
                    </tbody>
                </table>
            </div>

            <h2>Bảo mật</h2>
            <ul>
                <li>Không commit API key vào source code hay Git repository</li>
                <li>Luôn dùng environment variables hoặc secret manager</li>
                <li>Tạo key riêng cho từng môi trường (dev / staging / production)</li>
            </ul>
        </div>
    );
}