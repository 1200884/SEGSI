import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truckRoute from './routes/truckRoute';
import pathRoute from './routes/pathRoute';
import packagingRoute from './routes/packagingRoute';
import planningRoute from './routes/planningRoute';
import travelsRoute from './routes/travelsRoute';


export default () => {

	const app = Router();
	auth(app);
	user(app);
	role(app);
	truckRoute(app);
	pathRoute(app);
	packagingRoute(app);
	planningRoute(app);
	travelsRoute(app);

	return app
}