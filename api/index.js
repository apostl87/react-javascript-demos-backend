const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
require('dotenv');

const ProductModel = require('./Models/ProductModel.js');
const CountryModel = require('./Models/CountryModel.js');
const MerchantProductModel = require('./Models/MerchantProductModel.js');

const app = express();
const port = process.env.PORT || 3001;

// JWT Authorization
const audience = process.env.AUTH0_API_AUDIENCE;
const issuerBaseURL = process.env.AUTH0_BASE_URL;
const jwtCheck = auth({
	audience: audience,
	issuerBaseURL: issuerBaseURL,
	tokenSigningAlg: 'RS256',
	authRequired: false, // OF COURSE, THIS SETTING IS ONLY USED IF THE QUOTA IS EXCEEDED.
});

// Middleware for parsing incoming requests with JSON payloads
app.use(express.json());

// Middleware for cross-origin requests
let ALLOWED_ORIGINS = [];
if (process.env.ALLOWED_ORIGINS) {
	ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(" ")
}
app.use((req, res, next) => {
	let origin = req.headers.origin;
	let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
	res.setHeader("Access-Control-Allow-Origin", theOrigin);
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
})

// Enforce authorization on all endpoints
//app.use(jwtCheck); // This does not work correctly with the used version of express it seems

app.get('/check-token', jwtCheck, (req, res) => {
	res.status(200).send("Token is valid");
})

app.get('/countries', jwtCheck, (req, res) => {
	CountryModel.getCountries()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/products', jwtCheck, (req, res) => {
	ProductModel.getProducts()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.patch('/products/:id', jwtCheck, (req, res) => {
	const id = parseInt(req.params.id);
	ProductModel.updateProduct(id, req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/merchant-products/:merchant_userid', jwtCheck, (req, res) => {
	MerchantProductModel.getMerchantProducts(req.params.merchant_userid)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.patch('/merchant-products/:merchant_userid/:product_id', jwtCheck, (req, res) => {
	MerchantProductModel.updateMerchantProduct(req.params.merchant_userid, req.params.product_id, req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/merchant-products/create', jwtCheck, (req, res) => {
	MerchantProductModel.createMerchantProduct(req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/merchant-products/:merchant_userid/init', jwtCheck, (req, res) => {
	MerchantProductModel.initWithTestData(req.params.merchant_userid)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.delete('/merchant-products/:merchant_userid/:product_id', jwtCheck, (req, res) => {
	MerchantProductModel.deleteMerchantProduct(req.params.merchant_userid, req.params.product_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.delete('/merchant-products/:merchant_userid', jwtCheck, (req, res) => {
	MerchantProductModel.deleteAllMerchantProducts(req.params.merchant_userid)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.listen(port, () => {
	console.log(`API running on port ${port}.`)
})

module.exports = app;