import { Title } from "@tremor/react";
import Head from "next/head";

const SettingsPage = () => {
    return (
        <>
            <Head>
                <title>Settings</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
            <main>
                <Title>Settings</Title>
            </main>
        </>
    );
}

export default SettingsPage;
