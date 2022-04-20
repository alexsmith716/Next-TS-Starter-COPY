import type { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as Styles from '../styles/styles-about';
import { wrapper, AppState } from '../redux/store';

const fetchData = async () => {
	return await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')
		.then((res) => ({
			posts: res.data,
		}))
		.catch(() => ({
			posts: null,
		}));
};

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
	store.dispatch( {type: 'ABOUTCSVB_LOAD'});
	const data = await fetchData();
	console.log('######### AboutCSVBAboutCSVBAboutCSVB > getServerSideProps > data 000000: ', data);
	if(data){
		console.log('######### AboutCSVBAboutCSVBAboutCSVB > getServerSideProps > data 1111111: ', data);
		store.dispatch( {type: 'ABOUTCSVB_SUCCESS', result: data });
	} else {
		console.log('######### AboutCSVBAboutCSVBAboutCSVB > getServerSideProps > data 2222222: ', data);
		store.dispatch( {type: 'ABOUTCSVB_FAIL', error: {error: 'Error when attempting to fetch resource.'} });
	}
	//return {
	//	props: data,
	//};
});

//export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}) => {
//  console.log('2. Page.getServerSideProps uses the store to dispatch things');
//  store.dispatch({type: 'TICK', payload: 'was set in other page'});
//});

//export const getServerSideProps = async () => {
//  const data = await fetchData();
//  return {
//    props: data,
//  };
//};

interface AboutCSVBPageProps {
	//posts: any;
};

//const AboutCSVB: NextPage<AboutCSVBPageProps> = ({posts}) => {
const AboutCSVB: NextPage<AboutCSVBPageProps> = () => {
	//const dispatch = useDispatch();

	//const loading = useSelector((state: AppState) => state.aboutCSVBReducer.loading);
	//const loaded = useSelector((state: AppState) => state.aboutCSVBReducer.loaded);
	const aboutCSVBData = useSelector((state: AppState) => state.aboutCSVBReducer.aboutCSVBData);
	console.log('######### AboutCSVB > aboutCSVBData :::: ', aboutCSVBData);

	//if(posts) {
	//	console.log('######### AboutCSVBAboutCSVBAboutCSVB > posts:::: ', posts);
	//}

	//useEffect(() => {
	//  if (!aboutCSVBData) {
	//    dispatch(loadAboutCSVB())
	//  }
	//}, [data, dispatch]);

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
