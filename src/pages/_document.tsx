import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <body className='font-default flex h-full flex-col text-gray-600 antialiased'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
