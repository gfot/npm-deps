import path from 'path';
import express from 'express';
import { mainRouter, apiRouter } from './routes';

const app = express();

app.use(express.static(path.join(__dirname))); // __dirname depends on webpack server configuration
app.use('/api', apiRouter);
app.use(mainRouter);

export default app;
