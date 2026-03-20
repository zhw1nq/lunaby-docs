"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
    {
        group: "Getting Started",
        items: [
            { label: "Introduction", href: "/docs" },
            { label: "Quick Start", href: "/docs/quickstart" },
            { label: "Authentication", href: "/docs/authentication" },
        ],
    },
    {
        group: "Core API",
        items: [
            { label: "Models", href: "/docs/models" },
            { label: "Chat Completions", href: "/docs/chat" },
            { label: "Streaming", href: "/docs/streaming" },
            { label: "Image Generation", href: "/docs/images" },
        ],
    },
    {
        group: "SDK Reference",
        items: [
            { label: "SDK Overview", href: "/docs/sdk-reference" },
            { label: "Error Handling", href: "/docs/errors" },
        ],
    },
];

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-60 shrink-0 hidden lg:block">
            <div className="sticky top-16 pt-6 pb-10 pr-4 overflow-y-auto max-h-[calc(100vh-4rem)]">


                <nav className="space-y-6">
                    {NAV.map((section) => (
                        <div key={section.group}>
                            <p className="px-2 mb-2 mt-6 text-sm font-semibold text-foreground first:mt-0">
                                {section.group}
                            </p>
                            <ul className="space-y-0.5 mb-6">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "block px-2 py-1.5 rounded-md text-[13px] transition-colors",
                                                pathname === item.href
                                                    ? "bg-muted font-medium text-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}