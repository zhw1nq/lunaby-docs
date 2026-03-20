"use client";

import { useState } from "react";
import { Check, Copy, ChevronDown } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

const codeSnippet = `import Lunaby from "lunaby-sdk";
const client = new Lunaby();

const response = await client.responses.create({
  model: "lunaby",
  input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);`;

export function HeroCodeBlock() {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("install");

    const installCommand = "npm install lunaby-sdk";

    const copy = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const displayCode = activeTab === "install" ? installCommand : codeSnippet;
    const language = activeTab === "install" ? "bash" : "javascript";

    return (
        <div className="mt-12 mx-auto w-full max-w-2xl text-left bg-white dark:bg-[#0d1117] border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActiveTab("install")}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-foreground",
                            activeTab === "install" ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        Install
                    </button>
                    <button
                        onClick={() => setActiveTab("usage")}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-foreground",
                            activeTab === "usage" ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        Usage Example
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-muted/50 border border-border text-foreground">
                        {activeTab === "install" ? "bash" : "javascript"}
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </div>
                    <button
                        onClick={() => copy(displayCode)}
                        className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                </div>
            </div>
            <div className="relative bg-[#0d1117]">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        fontSize: "14px",
                        backgroundColor: "transparent",
                    }}
                    showLineNumbers={activeTab === "usage"}
                    lineNumberStyle={{
                        minWidth: "2.5em",
                        paddingRight: "1em",
                        color: "#6e7681",
                        textAlign: "right",
                    }}
                >
                    {displayCode}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}