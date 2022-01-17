import express, {Application} from 'express';
import morgan from 'morgan';

import authRoutes from './routes/auth';
import reviewRoutes from './routes/index'

const app : Application = express();

//Settings
app.set('port', process.env.PORT);

//Middleware
app.use(morgan('dev'));
app.use(express.json())

//routes
app.use('/api/auth',authRoutes);
app.use('/api', reviewRoutes);

export default app;