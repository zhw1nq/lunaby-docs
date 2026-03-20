import { cn } from "@/lib/utils";

interface Param {
    name: string;
    type: string;
    required?: boolean;
    description: string;
    default?: string;
}

export function ParamTable({ params }: { params: Param[] }) {
    return (
        <div className="my-4 rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-muted border-b">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-40">Tên</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-28">Kiểu</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Mô tả</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {params.map((p) => (
                        <tr key={p.name} className="hover:bg-muted/40 transition-colors">
                            <td className="px-4 py-3 align-top">
                                <div className="flex items-center gap-1.5">
                                    <code className="font-mono text-xs font-semibold text-foreground">{p.name}</code>
                                    {p.required && (
                                        <span className="text-[10px] text-red-500 font-medium">required</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-3 align-top">
                                <code className="text-xs text-cyan-500 dark:text-cyan-400 font-mono">{p.type}</code>
                            </td>
                            <td className="px-4 py-3 align-top text-xs text-muted-foreground leading-relaxed">
                                {p.description}
                                {p.default && (
                                    <span className="ml-1 text-xs text-muted-foreground/70">
                                        Mặc định: <code className="font-mono">{p.default}</code>
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}