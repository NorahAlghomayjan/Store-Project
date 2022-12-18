import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_routes from './routes/user';
import product_routes from './routes/product';
import { orders_routes } from './routes/order';
import { orders_products_routes } from './routes/orders_products';
import cors from 'cors';
const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response): void {
    res.send('Hello from 2 project!');
});

user_routes(app);
product_routes(app);
orders_routes(app);
orders_products_routes(app);

app.listen(process.env.PORT, function (): void {
    console.log(`starting app on: ${process.env.ADDRESS}`);
});

export default app;
