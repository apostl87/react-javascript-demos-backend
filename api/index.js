const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const cors = require('cors');
require('dotenv');

const CountryModel = require('./Models/CountryModel.js');
const ProductModel = require('./Models/ProductModel.js');
const CategoryModel = require('./Models/CategoryModel.js');

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
let ALLOWED_ORIGINS = []
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

app.get('/check-connection', jwtCheck, (req, res) => {
	res.status(200).send("Authentication successful");
})

app.get('/products', jwtCheck, (req, res) => { // TODO: Replace this endpoint by the standard endpoint with pagination, sorting, and filtering (products-new)
	ProductModel.getAllProducts()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/products-new', jwtCheck, (req, res) => {
	ProductModel.getProducts(req.query)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/products/:product_id', jwtCheck, (req, res) => {
	ProductModel.getProduct(req.params.product_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/products/category/:category_id', jwtCheck, (req, res) => {
	ProductModel.getProductsByCategory(req.params.category_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/bestsellers', jwtCheck, (req, res) => {
	ProductModel.getBestsellers()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/bestsellers/category/:category_id/', jwtCheck, (req, res) => {
	ProductModel.getBestsellers(req.params.category_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/merchant-products/:merchant_userid', jwtCheck, (req, res) => {
	ProductModel.getMerchantProducts(req.params.merchant_userid)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.patch('/merchant-products/:merchant_userid/:product_id', jwtCheck, (req, res) => {
	ProductModel.updateMerchantProduct(req.params.merchant_userid, req.params.product_id, req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/merchant-products/create', jwtCheck, (req, res) => {
	ProductModel.createMerchantProduct(req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/merchant-products/:merchant_userid/init', jwtCheck, (req, res) => {
	ProductModel.initWithTestData(req.params.merchant_userid)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.delete('/merchant-products/:merchant_userid/:product_id', jwtCheck, (req, res) => {
	ProductModel.deleteMerchantProduct(req.params.merchant_userid, req.params.product_id)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.delete('/merchant-products/:merchant_userid', jwtCheck, (req, res) => {
	ProductModel.deleteAllMerchantProducts(req.params.merchant_userid)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
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

app.get('/categories', jwtCheck, (req, res) => {
	CategoryModel.getCategories()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.get('/categories/variants', jwtCheck, (req, res) => {
	CategoryModel.getAllVariants()
		.then(response => {
			res.status(200).send(response);
		})
})

app.get('/categories/variants/:category_id', jwtCheck, (req, res) => {
	CategoryModel.getVariantsByCategory(req.params.category_id)
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