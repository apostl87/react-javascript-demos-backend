const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const { check, validationResult } = require('express-validator'); // Basic sanitization to protect from SQL injections
const cors = require('cors');
require('dotenv');

const ProductModel = require('./Models/ProductModel.js');
const CountryModel = require('./Models/CountryModel.js');
const MerchantProductModel = require('./Models/MerchantProductModel.js');

const app = express();
const port = process.env.PORT || 3001;

// JWT Validation
const audience = process.env.AUTH0_API_AUDIENCE;
const issuerBaseURL = process.env.AUTH0_BASE_URL;
const jwtCheck = auth({
	audience: audience,
	issuerBaseURL: issuerBaseURL,
	tokenSigningAlg: 'RS256'
});

// Parse incoming requests with JSON payloads
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

// Basic sanitization and validation checks by express-validator
let sanitizeAndValidate = [
	check('**', '').escape(),
	//check('mp_c_id_production', '').isInt().optional({values: 'undefined'}),
]


// Endpoints
app.get('/check-token', jwtCheck, (req, res) => {
	res.status(200).send("Token is valid");
})

app.get('/countries', (req, res) => {
	CountryModel.getCountries()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/products', (req, res) => {
	ProductModel.getProducts()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/merchant-products/:merchant_user_id', sanitizeAndValidate, (req, res) => {
	// console.log(req.params.merchant_user_id);

	const valRes = validationResult(req);
	if (valRes.errors.length) {
		console.log("Validation error(s): ", valRes.errors);
		res.status(500).send(valRes.errors);
		return;
	}

	MerchantProductModel.getMerchantProducts(req.params.merchant_user_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.patch('/merchant-products/:merchant_user_id/:product_id', sanitizeAndValidate, (req, res) => {

	const valRes = validationResult(req);
	if (valRes.errors.length) {
		console.log("Validation error(s): ", valRes.errors);
		res.status(500).send(valRes.errors);
		return;
	}

	MerchantProductModel.updateMerchantProduct(req.params.merchant_user_id, req.params.product_id, req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/merchant-products/create', sanitizeAndValidate, (req, res) => {

	const valRes = validationResult(req);
	if (valRes.errors.length) {
		console.log("Validation error(s): ", valRes.errors);
		res.status(500).send(valRes.errors);
		return;
	}

	MerchantProductModel.createMerchantProduct(req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/merchant-products/:merchant_user_id/init', sanitizeAndValidate, (req, res) => {

	const valRes = validationResult(req);
	if (valRes.errors.length) {
		console.log("Validation error(s): ", valRes.errors);
		res.status(500).send(valRes.errors);
		return;
	}

	MerchantProductModel.initWithTestData(req.params.merchant_user_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.delete('/merchant-products/:merchant_user_id/:product_id', sanitizeAndValidate, (req, res) => {

	const valRes = validationResult(req);
	if (valRes.errors.length) {
		console.log("Validation error(s): ", valRes.errors);
		res.status(500).send(valRes.errors);
		return;
	}

	MerchantProductModel.deleteMerchantProduct(req.params.merchant_user_id, req.params.product_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.delete('/merchant-products/:merchant_user_id', sanitizeAndValidate,  (req, res) => {

	const valRes = validationResult(req);
	if (valRes.errors.length) {
		console.log("Validation error(s): ", valRes.errors);
		res.status(500).send(valRes.errors);
		return;
	}
	
	MerchantProductModel.deleteAllMerchantProducts(req.params.merchant_user_id)
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