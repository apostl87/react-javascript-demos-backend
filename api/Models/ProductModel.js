const dbinfo = require('../dbinfo.js');

const pool = dbinfo.pool;

const getProducts = () => {
  return new Promise(function (resolve, reject) {
    let psql = 'SELECT * FROM products JOIN countries ON products.country_id_production = countries.country_id ORDER BY products.id ASC';
    pool.query(psql, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const updateProduct = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { product_name, color, weight, price_currency, price, country_id, image_url} = body;

    pool.query(
      'UPDATE products SET product_name = $1, color = $2, weight_kg = $3, price = $4, country_id_production = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [product_name, color, weight, price, country_id, image_url, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Product modified with ID: ${results.rows[0].id}`);
      }
    );
  });
};

module.exports = {
  getProducts,
  updateProduct,
}