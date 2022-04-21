import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as Styles from '../styles/styles-about';
import { loadAboutCSVB } from '../redux/reducers/aboutCSVBSlice';
import { wrapper, AppState } from '../redux/store';

export const getServerSideProps: any = wrapper.getServerSideProps((store: any) => () => {
	return store.dispatch(loadAboutCSVB());
});

interface AboutCSVBPageProps {};

const AboutCSVB: NextPage<AboutCSVBPageProps> = () => {
	const loading = useSelector((state: AppState) => state.aboutCSVBReducer.loading);
	const loaded = useSelector((state: AppState) => state.aboutCSVBReducer.loaded);
	const aboutCSVBData = useSelector((state: AppState) => state.aboutCSVBReducer.aboutCSVBData);

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
							POSTS!!!!: {/* {aboutCSVBData && aboutCSVBData} */}
						</p>
						<p>
							<b>This component utilizes the AboutCSVB.</b>
						</p>
						<p>
							AboutCSVB AboutCSVB AboutCSVB AboutCSVB.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutCSVB;
