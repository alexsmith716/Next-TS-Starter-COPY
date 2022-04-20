import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { AxiosInstance } from 'axios';

const METAWEATHER_LOAD = 'METAWEATHER_LOAD';
const METAWEATHER_SUCCESS = 'METAWEATHER_SUCCESS';
const METAWEATHER_FAIL = 'METAWEATHER_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.metaWeatherReducer,
			};
		case METAWEATHER_LOAD:
			return {
				...state,
				loading: true,
			};
		case METAWEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				metaWeatherData: action['result'],
			};
		case METAWEATHER_FAIL:
			//console.log('######### TSTSTSTSTSTSTSTSTSTSTSTSTSTST: ', state);
			//console.log('######### ACCACACAACCACACACACACACACACAC: ', action);
			//console.log('######### ACCACACAACCACACACACACACACACAC2222: ', action.error);
			return {
				...state,
				loading: false,
				loaded: false,
				metaWeatherData: action['error'],
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadMetaWeather(): AnyAction {
	//console.log('??????????????????????? loadMetaWeather()loadMetaWeather()loadMetaWeather() ?????????????????');
	// {params: {location: 2459115}}
	//httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get('/api/metaweather', {params: {location: 2459115}})
	//httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get('http://localhost:3000/api/metaweather', {headers: {'Content-type': 'application/json','Access-Control-Allow-Origin': '*'}})
	//httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get('/api/metaweather', {headers: {'Content-type': 'application/json','Access-Control-Allow-Origin': '*'}})
	return {
		type: [METAWEATHER_LOAD, METAWEATHER_SUCCESS, METAWEATHER_FAIL],
		httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get('https://www.metaweather.com/api/location/2459115', {headers: {'Content-type': 'application/json','Access-Control-Allow-Origin': '*'}})
			.then((response) => {
				//console.log('RDRDRDRDRDRDRDRDRDRDRDRRD > METAWEATHER > RESPONSE: ', response);
				return response;
			})
			.catch((error) => {
				//console.log('RDRDRDRDRDRDRDRDRDRDRDRRD > METAWEATHER > ERROR: ', error);
				//return Promise.reject(error);
				return error;
			})
	};
};
