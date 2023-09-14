const api = require('lambda-api')();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const VERSION = uuidv4();

// Middleware para habilitar o CORS em todas as rotas
api.use((req, res, next) => {
  res.cors({
    origin: 'https://right-batman-beige-thailand.bohr.io', // Permitir todas as origens (mudar para a origem real da página da web)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    headers: ['Content-Type', 'Authorization'], 
  });
  next();
});

api.get('/integracao', async (req, res) => {
  const { data } = await axios.get("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20");
  res.json(data);
});

api.get('/status', async (req, res) => {
  res.json({ version: VERSION });
});

api.post('/integracao', async (req, res) => {
  const { v_card } = req.body;
  const bodyData = { cadastro: [v_card] };
  axios.patch("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res.header('apikey', 'apikey');
  res.json(v_card);
});

api.get('/integracao/reset', async (req, res) => {
  const bodyData = { cadastro: [] };
  axios.put("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  res.json({ message: "Sucesso" });
});

export async function handler(event, context) {
  return await api.run(event, context);
}
