import express from 'express';
import { router } from './routes.js';
import cors from 'cors';


// chamando o express
const app = express();

// dizendo que receberemos respostas em json
app.use(express.json());

// liberar que mais ip's faça requests
app.use(cors());

app.use(router);

const server = app.listen(process.env.PORT_BACK, () => {
  console.log('✅ Servidor Online!');
  console.log(`🔗 Acessível em: http://localhost:${process.env.PORT_BACK}`);
});
