import express from 'express';
import userRoutes from './routes/user.routes';
import moviesRoutes from './routes/movies.routes';

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/movie", moviesRoutes)

export default app;
