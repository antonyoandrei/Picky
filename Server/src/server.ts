import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import moviesRoutes from './routes/movies.routes';
import genresRoutes from './routes/genres.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/movie", moviesRoutes);
app.use("/genre", genresRoutes);

export default app;
