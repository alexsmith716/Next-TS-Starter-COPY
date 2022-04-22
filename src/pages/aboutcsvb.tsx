import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
//import { Store, AnyAction } from 'redux';
import * as Styles from '../styles/styles-about';
import { loadAboutCSVB } from '../redux/reducers/aboutCSVBSlice';
import Loading from '../components/Loading/Loading';
//@ts-ignore
import { wrapper, AppState } from '../redux/store';

// fix below types
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store): any => async () => {
	await store.dispatch(loadAboutCSVB())
		.catch(async () => {
			await store.dispatch( {type: 'ABOUTCSVB_FAIL' });
		});
});

interface AboutCSVBPageProps {};

const AboutCSVB: NextPage<AboutCSVBPageProps> = () => {
	let postsData;

	const loading = useSelector((state: AppState) => state.aboutCSVBReducer.loading);
	const loaded = useSelector((state: AppState) => state.aboutCSVBReducer.loaded);
	const aboutCSVBData = useSelector((state: AppState) => state.aboutCSVBReducer.aboutCSVBData);

	if(aboutCSVBData && !aboutCSVBData.error) {
		postsData = aboutCSVBData.props.posts;
	}

	return (
		<>
			<Head>
				<title>AboutCSVB</title>
			</Head>

			<div className="container">
				<h1 className="mt-4 mb-3">AboutCSVB</h1>

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">
					<div className="col-grid mb-4">
						<Styles.AboutImageMain
							className="img-fluid rounded"
							src={'/about-750-450.png'}
							alt={''}
						/>
					</div>

					<div className="col-grid">
						<h2>AboutCSVB</h2>
						<p>
							<b>This component utilizes the AboutCSVB.</b>
						</p>

						{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{loading && <Loading text="Loading" />}

						{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{!loaded && aboutCSVBData && aboutCSVBData.error && (
							<div className="bg-warn-red container-padding-radius-10 text-color-white">
								{aboutCSVBData.error}
							</div>
						)}
						{loaded && aboutCSVBData && !aboutCSVBData.error && (
							// fix below types
							<>{postsData.map((post: any, key: any) => (
								<p key={key}>
									{post.body}
								</p>
							))}</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutCSVB;
