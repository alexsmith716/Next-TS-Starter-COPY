import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { loadMetaWeather } from '../../redux/reducers/metaWeatherSlice';
import Loading from '../Loading/Loading';
import Button from '../Button';
import * as Styles from './styles';

const MetaWeather = () => {
	const dispatch = useDispatch();

	const loading = useSelector((state: AppState) => state.metaWeatherReducer.loading);
	const loaded = useSelector((state: AppState) => state.metaWeatherReducer.loaded);
	const metaWeatherData = useSelector((state: AppState) => state.metaWeatherReducer.metaWeatherData);
	//const metaWeatherDataST = useSelector((state: AppState) => state.metaWeatherReducer.metaWeatherData.consolidated_weather[0].weather_state_name);
	//const metaWeatherDataTP = useSelector((state: AppState) => state.metaWeatherReducer.metaWeatherData.consolidated_weather[0].the_temp);

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	});
	// formatter.format(10.619900000000001)

	//console.log('######### MetaWeatherMetaWeatherMetaWeather > loading: ', loading);
	//console.log('######### MetaWeatherMetaWeatherMetaWeather > loaded: ', loaded);
	//console.log('######### MetaWeatherMetaWeatherMetaWeather > metaWeatherData: ', metaWeatherData);
	//console.log('######### MetaWeatherMetaWeatherMetaWeather > metaWeatherDataST: ', metaWeatherDataST);
	//console.log('######### MetaWeatherMetaWeatherMetaWeather > metaWeatherDataTP: ', metaWeatherDataTP);
	// parseFloat(10.669000000000001).toFixed(3)

	return (
		<div className="container">
			<Styles.MetaWeatherContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.MetaWeatherContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!loading && (
						<Styles.MetaWeatherContainerStyled className="flex-column-center">
							<div>
								The Exclusive <i>MetaWeather.com</i>&nbsp;forecast{loaded && metaWeatherData && <>&nbsp;for:</>}
							</div>

							<div>
								{process.env.ENV_VARIABLE_fetchBridgeRatings_identityPoolId}
							</div>

							<div>
								{!loaded && metaWeatherData && <Styles.DataMessage>{metaWeatherData.error}</Styles.DataMessage>}
							</div>

							<div>
								{loaded && metaWeatherData && <Styles.DataMessage>{metaWeatherData.title}&nbsp;{metaWeatherData.location_type}</Styles.DataMessage>}
							</div>

							<div>
								{loaded && metaWeatherData && <>metaWeatherDataST&nbsp;<Styles.DataMessage>and</Styles.DataMessage>&nbsp;metaWeatherDataTP&nbsp;celsius</>}
							</div>

							<div className="mt-2">
								<Button
									className="btn-primary btn-md"
									onClick={() => dispatch(loadMetaWeather())}
									buttonText="Reload"
								/>
							</div>
						</Styles.MetaWeatherContainerStyled>
					)}
				</Styles.MetaWeatherContainer>
			</Styles.MetaWeatherContainerBgColor>
		</div>
	);
};

export default MetaWeather;
