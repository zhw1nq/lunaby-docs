"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    className?: string;
}

export function CodeBlock({ code, language = "typescript", filename, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("relative rounded-lg overflow-hidden border border-border my-4", className)}>
            {filename && (
                <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-white/10">
                    <span className="text-xs text-zinc-400 font-mono">{filename}</span>
                </div>
            )}
            <div className="relative group">
                <button
                    onClick={copy}
                    className="absolute right-3 top-3 z-10 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                    {copied
                        ? <Check size={13} className="text-emerald-400" />
                        : <Copy size={13} className="text-zinc-400" />}
                </button>
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{ margin: 0, borderRadius: 0, fontSize: "13px", padding: "1.25rem" }}
                    showLineNumbers={false}
                >
                    {code.trim()}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}