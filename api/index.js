const express = require('express');
const cors = require('cors');
const ProductModel = require('./express/Models/ProductModel.js');
const CountryModel = require('./express/Models/CountryModel.js');
const MerchantProductModel = require('./express/Models/MerchantProductModel.js');

const app = express()
const port = 3001

app.use(express.json())

// Enable CORS for cross-origin requests
app.use(cors());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

app.get('/products', (req, res) => {
	ProductModel.getProducts()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.post('/products/create', (req, res) => {
	ProductModel.createProduct(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.delete('/products/:id', (req, res) => {
	ProductModel.deleteProduct(req.params.id)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.patch('/products/:id', (req, res) => {
	const id = parseInt(req.params.id);
	ProductModel.updateProduct(id, req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
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

app.get('/merchant-products/:merchant_userid', (req, res) => {
	MerchantProductModel.getMerchantProducts(req.params.merchant_userid)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.patch('/merchant-products/:merchant_userid/:product_id', (req, res) => {
	MerchantProductModel.updateMerchantProduct(req.params.merchant_userid, req.params.product_id, req.body)
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
