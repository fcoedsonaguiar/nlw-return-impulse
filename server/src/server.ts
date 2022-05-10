import cors from 'cors'
import express from 'express';
import { routes } from './routes'

const app = express();

app.use(cors({
    // endereços/sites que poderá acessar o backend
}));
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP server runing: port 3333')
})