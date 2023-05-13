import * as Tooltip from '@radix-ui/react-tooltip';
import Layout from 'components/Layout';
import 'styles/globals.css';

export default function MyApp({ Component, pageProps }) {
	return (
		<Tooltip.Provider delayDuration={500}>
			<Layout className={''}>
				<Component {...pageProps} />
			</Layout>
		</Tooltip.Provider>
	);
}
