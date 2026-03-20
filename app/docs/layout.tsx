import { DocsSidebar } from "@/components/docs-sidebar";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { TableOfContents } from "@/components/toc";

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
    let apiVersion = "1.0";
    try {
        const res = await fetch("https://api.lunie.dev", { next: { revalidate: 3600 } });
        if (res.ok) {
            const data = await res.json();
            if (data?.version) {
                apiVersion = data.version.split(".")[0] + ".0";
            }
        }
    } catch (e) {
        console.error("Failed to fetch API version:", e);
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top nav */}
            <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center relative">
                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-2 absolute left-6 hover:opacity-80 transition-opacity">
                        <Image
                            src="https://github.com/lun4by/Lunaby/blob/main/assets/avatar.png?raw=true"
                            alt="Lunaby Logo"
                            width={28}
                            height={28}
                            className="size-7 rounded-md object-cover shadow-sm"
                        />
                        <span className="font-semibold text-lg tracking-tight">Lunaby Developers</span>
                    </Link>

                    {/* Center: Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground w-full justify-center">
                        <Link href="/docs" className="hover:text-foreground transition-colors font-medium text-foreground">Docs</Link>
                        <Link href="https://api.lunie.dev" className="hover:text-foreground transition-colors" target="_blank">API</Link>
                        <Link href="https://github.com/lun4by/lunaby-sdk" className="hover:text-foreground transition-colors" target="_blank">GitHub</Link>
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 absolute right-6">
                        <span className="hidden sm:block text-xs border border-border text-foreground px-2 py-1 rounded-full font-medium">
                            v{apiVersion}
                        </span>
                        <Link
                            href="https://api.lunie.dev"
                            target="_blank"
                            className="flex items-center gap-1.5 text-xs bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-1.5 rounded-full transition-colors font-medium shadow-sm"
                        >
                            Dashboard <ArrowUpRight className="size-3.5" />
                        </Link>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Body */}
            <div className="max-w-[1400px] mx-auto px-6 w-full flex-1 flex gap-12 py-2 relative">
                <DocsSidebar />
                <main className="flex-1 min-w-0 py-10 max-w-4xl">
                    {children}
                </main>

                {/* Right ToC Sidebar */}
                <aside className="w-56 shrink-0 hidden xl:block ml-auto xl:pl-4">
                    <div className="sticky top-28 pt-8">
                        <TableOfContents />
                    </div>
                </aside>
            </div>
        </div>
    );
}