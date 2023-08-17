import { APIGatewayEvent, Context } from 'aws-lambda';
import createAPI from 'lambda-api';
import axios from 'axios';

const api = createAPI({});


const VERSION = "2.0.0"

api.get('/integracao', async (req, res) => {
	const { data } = await axios.get("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20")
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.header('Version', VERSION)
	res.json(data)
})

api.get('/status', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.header('Version', VERSION)
	res.json({version: VERSION})
})

api.post('/integracao', async (req, res) => {
	const { v_card } = req.body
	const bodyData = { cadastro: [v_card] }
	axios.patch("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.header('Version', VERSION)
	res.json(v_card)
})

api.get('/integracao/reset', async (req, res) => {
		const bodyData = { cadastro: [] as any }
	axios.put("https://api.jsonstorage.net/v1/json/42fd61f0-4b50-4085-9d3b-b782b5f12341/42efa98a-5d08-4578-b569-0e9ddd282a20?apiKey=565deae6-50a4-4f37-a54a-21d60c2f54d8", bodyData, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.header('Version', VERSION)
	res.json({ message: "Sucesso" })
})


export async function handler(event: APIGatewayEvent, context: Context) {
	return await api.run(event, context);
}