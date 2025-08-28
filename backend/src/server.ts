import express from 'express';
import { router } from './routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


// chamando o express
const app = express();

// dizendo que receberemos respostas em json
app.use(express.json());

// liberar que mais ip's faça requests
app.use(cors());

// middleware de cookie-parser; para evitar o erro de typerror cannot destructure token from req.cookies
app.use(cookieParser());

app.use(router);

const server = app.listen(process.env.PORT_BACK, () => {
  console.log('✅ Servidor Online!');
  console.log(`🔗 Acessível em: http://localhost:${process.env.PORT_BACK}`);
});
