import { APIGatewayEvent, Context } from 'aws-lambda';
import createAPI, { Response } from 'lambda-api';
import axios from 'axios';

const api = createAPI({});


const VERSION = "2.4.0"

// Middleware para ignorar solicitações OPTIONS
api.use((req, res, next) => {
	if (req.method === 'OPTIONS') {
		res.sendStatus(204); // Responda com um status 204 No Content
	} else {
		next();
	}
});

api.get('/integracao', async (req, res) => {
	const { data } = await axios.get("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20")
	res.json(data)
})

api.get('/status', async (req, res) => {
	res.json({ version: VERSION })
})

api.post('/integracao', async (req, res) => {
	res.cors();
	const { v_card } = req.body
	const bodyData = { cadastro: [v_card] }
	axios.patch("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	res.json(v_card)
})

api.get('/integracao/reset', async (req, res) => {
	const bodyData = { cadastro: [] as any }
	axios.put("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
		headers: {
			'Content-Type': 'application/json'
		}
	})

	res.json({ message: "Sucesso" })
})


export async function handler(event: APIGatewayEvent, context: Context) {
	return await api.run(event, context);
}