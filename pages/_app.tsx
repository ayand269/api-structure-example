import { SideNav } from "@/components/SideNav";
import { MarkdocNextJsPageProps } from "@markdoc/next.js";
import { AppProps } from "next/app";
import Head from "next/head";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'prismjs';
// Import other Prism themes here
import 'prismjs/components/prism-bash.min';
import 'prismjs/themes/prism.css';
import '@/public/globals.css'
import Header from "@/components/Header";
import { useEffect, useRef } from "react";

export type MyAppProps = MarkdocNextJsPageProps
const TITLE = 'Markdoc';
const DESCRIPTION = 'A powerful, flexible, Markdown-based authoring framework';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps<MyAppProps>) {
    const { markdoc } = pageProps;
    const containerRef = useRef<HTMLDivElement>(null);

    let title = TITLE;
    let description = DESCRIPTION;
    if (markdoc) {
        if (markdoc.frontmatter.title) {
            title = markdoc.frontmatter.title;
        }
        if (markdoc.frontmatter.description) {
            description = markdoc.frontmatter.description;
        }
    }

    const handleScroll = () => {
        console.log("cal")
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;
        const childElement = document.getElementsByClassName('codes-block')[0];

        if(childElement){
            if(scrollTop > 60) {
                childElement.classList.add('sticky');
            }else{
                childElement.classList.remove('sticky');
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="referrer" content="strict-origin" />
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="page">
                <SideNav />

                <main className="flex column">
                    <Header />
                    <div className="article-main-section" ref={containerRef}>
                        <Component {...pageProps} />
                    </div>
                </main>
            </div>
        </>
    );
}