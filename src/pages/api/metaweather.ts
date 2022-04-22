import { NextApiResponse } from 'next';
import axios from 'axios';
// AxiosResponse

export default async function handler(res: NextApiResponse) {
	try {
		const returned = await axios('https://www.metaweather.com/api/location/2459115');
		res.status(returned.status).json(returned.data);
	} catch (error) {
		// const typedError = error as Error;
		// error.isAxiosError
		res.status(400);
	}
};
