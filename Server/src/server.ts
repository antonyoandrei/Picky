import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import moviesRoutes from './routes/movies.routes';
import genresRoutes from './routes/genres.routes';
import errorHandler from './middlewares/error.middleware';
import { checkJwtMiddleware } from './middlewares/checkJwt.middleware';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(errorHandler)
app.use("/user", userRoutes);
app.use("/movie", checkJwtMiddleware, moviesRoutes);
app.use("/genre", genresRoutes);

export default app;
