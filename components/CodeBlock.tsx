import Prism from 'prismjs';
import React, { useEffect, useRef } from 'react';
import 'prismjs/components/prism-json';

type Props = {
    children: string;
    'data-language': string;
    title?: string
};

export function CodeBlock({ children, 'data-language': language, title }: Props) {
    const ref = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) Prism.highlightElement(ref.current, false);
    }, [children]);

    return (
        <div className={`code`} aria-live="polite" >
            <p className="code-title">{title}</p>
            <div
                className='code-body'
                ref={containerRef}
            >
                <pre
                    ref={ref}
                    className={`language-${language}`}
                >
                    {children}
                </pre>
            </div>
        </div>
    );
}