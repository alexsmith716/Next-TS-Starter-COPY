import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { AxiosInstance } from 'axios';

const ABOUTCSVB_LOAD = 'ABOUTCSVB_LOAD';
const ABOUTCSVB_SUCCESS = 'ABOUTCSVB_SUCCESS';
const ABOUTCSVB_FAIL = 'ABOUTCSVB_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.aboutCSVBReducer,
			};
		case ABOUTCSVB_LOAD:
			console.log('######### AboutCSVB > aboutCSVBReducer > ABOUTCSVB_LOAD > 00000000');
			return {
				...state,
				loading: true,
			};
		case ABOUTCSVB_SUCCESS:
			console.log('######### AboutCSVB > aboutCSVBReducer > ABOUTCSVB_SUCCESS > 11111111a: ', state);
			console.log('######### AboutCSVB > aboutCSVBReducer > ABOUTCSVB_SUCCESS > 11111111b: ', action);
			return {
				...state,
				loading: false,
				loaded: true,
				aboutCSVBData: action['result'],
			};
		case ABOUTCSVB_FAIL:
			console.log('######### AboutCSVB > aboutCSVBReducer > ABOUTCSVB_FAIL > 22222222a: ', state);
			console.log('######### AboutCSVB > aboutCSVBReducer > ABOUTCSVB_FAIL > 22222222b: ', action);
			return {
				...state,
				loading: false,
				loaded: false,
				aboutCSVBData: action['error'],
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadAboutCSVB(): AnyAction {
	return {
		type: [ABOUTCSVB_LOAD, ABOUTCSVB_SUCCESS, ABOUTCSVB_FAIL],
		httpClientPromise: () => fetchBridgeRatings()
			.then((response) => {
				return response.result;
			})
			.catch((error) => {
				return Promise.reject(error.result);
			})
	};
};
