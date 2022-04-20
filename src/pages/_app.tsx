import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { ThemeContext } from '../styled/ThemeContext';
import { Layout } from '../components/Layout';
import { actionSetUserAgent } from '../redux/reducers/userAgentSlice';
import { loadMetaWeather } from '../redux/reducers/metaWeatherSlice';
import { getUserAgent, isBot } from '../utils/userAgent';
import '../styled/fonts.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<ThemeContext>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeContext>
		</>
	);
};

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
	const serverRequest = typeof window === 'undefined' && !ctx.req?.url?.startsWith('/_next');
	// const serverRequest = typeof window === "undefined" && !ctx.req?.url?.startsWith("/_next/data") && !ctx.req?.url?.startsWith("/_next/static") && !ctx.req?.url?.startsWith("/_next/webpack-hmr")

	if (serverRequest) {
		await store.dispatch(actionSetUserAgent(getUserAgent(ctx?.req?.headers['user-agent']!), isBot(ctx?.req?.headers['user-agent']!)));
	}

	//if (serverRequest) {
	//	//console.log('######### ___APP > !!!!!!!! ***********************************: ');
	//	await store.dispatch(loadMetaWeather())
	//		.then((response) => {
	//			//console.log('######### ___APP > THEN ***********************************: ', response);
	//		})
	//		.catch(async (error) => {
	//			//console.log('######### ___APP > CATCH *********************************: ', error);
	//			// handling all 400's
	//			await store.dispatch( {type: 'METAWEATHER_FAIL', error: {error: 'Error when attempting to fetch resource.'} });
	//		});
	//}

	const pageProps = {
		...(Component.getInitialProps
			? await Component.getInitialProps({
					...ctx,
					store,
				})
			: {}),
	};

	return {
		pageProps,
	};
});

export default wrapper.withRedux(App);
