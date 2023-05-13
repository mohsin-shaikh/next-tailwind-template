import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react"
import * as Tooltip from '@radix-ui/react-tooltip';
import Layout from 'components/Layout';
import 'styles/globals.css';

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const { pathname } = useRouter()
	const isLayoutNeeded = pathname.startsWith('/admin')
	return (
		<SessionProvider
			// Provider options are not required but can be useful in situations where
			// you have a short session maxAge time. Shown here with default values.
			session={session}
		>
			{isLayoutNeeded ? (
				<Tooltip.Provider delayDuration={500}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Tooltip.Provider>
			) : (
				<Component {...pageProps} />
			)}
		</SessionProvider>
	);
}
