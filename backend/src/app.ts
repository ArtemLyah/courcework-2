import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandler';
import { fisherRouter } from './routers/fishers.router';
import { fisheringPlacesRouter } from './routers/fishingplaces.router';
import { organisationsRouter } from './routers/organisation.router';
import { ordersRouter } from './routers/orders.router';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const api = express.Router();
app.use('/api', api);
api.use('/fishers', fisherRouter);
api.use('/orders', ordersRouter);
api.use('/places', fisheringPlacesRouter);
api.use('/organisations', organisationsRouter);

app.use(errorHandler)

export default app;