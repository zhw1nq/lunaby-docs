import React from "react";

interface DocsHeaderProps {
    section?: string;
    title: string;
    description?: React.ReactNode;
}

export function DocsHeader({ section, title, description }: DocsHeaderProps) {
    return (
        <div className="not-prose mb-8">
            {section && (
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-2">
                    {section}
                </p>
            )}
            <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">{title}</h1>
            {description && (
                <div className="text-base text-muted-foreground leading-relaxed max-w-[85%]">
                    {description}
                </div>
            )}
        </div>
    );
}