import express from 'express';
import authRouter from './routes/authRouter';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('⚡️[server]: Server is running on port 3000');
});