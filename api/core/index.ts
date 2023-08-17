import { APIGatewayEvent, Context } from 'aws-lambda';
import createAPI from 'lambda-api';
import axios from 'axios';

const api = createAPI();



api.get('/integracao', async (req, res) => {
	const { data } = await axios.get("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20")
	res.json(data)
})

api.post('/integracao', async (req, res) => {
	const { v_card } = req.body
	const bodyData = { cadastro: [v_card] }
	axios.patch("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	res.json(v_card)
})

api.post('/integracao/reset', async (req, res) => {
	const { v_card } = req.body
	const bodyData = { cadastro: [] as any }
	axios.put("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	res.json(v_card)
})


export async function handler(event: APIGatewayEvent, context: Context) {
	return await api.run(event, context);
}