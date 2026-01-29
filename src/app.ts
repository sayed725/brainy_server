import express from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import routes from './routes';
import { notFound } from './middlewares/notFound';

const app = express();

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))
app.use(express.json());

app.all('/api/auth/*splat', toNodeHandler(auth));



app.use('/api/v1', routes)


app.get('/', (req, res)=> {
    res.send("Hello from Brainy App!")
})

app.use(notFound);

export default app;