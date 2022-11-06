import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truckRoute from './routes/truckRoute';
import pathRoute from './routes/pathRoute';


export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truckRoute(app);
	pathRoute(app);
	
	return app
}