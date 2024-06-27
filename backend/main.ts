import express from 'express';
import authRouter from './routes/authRouter';
import employeeRouter from "./routes/emplRouter";
import companyRouter from "./routes/companyRouter";

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use("/empl", employeeRouter);
app.use("/company", companyRouter);

app.listen(3000, () => {
    console.log('⚡️ [server]: Server is running on port 3000');
});