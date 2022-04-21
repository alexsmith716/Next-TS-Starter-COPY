import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	try {
		const response = await axios('https://www.metaweather.com/api/location/2459115');
		res.status(response.status).json(response.data);
	} catch (error) {
		let responseStatus;
		error.response && error.response.status ? responseStatus = error.response.status : responseStatus = 400;
		// error.isAxiosError
		res.status(responseStatus).json({
			error: error,
		})
	}
};
