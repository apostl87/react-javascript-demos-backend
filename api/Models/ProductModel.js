const dbinfo = require('../dbinfo.js');

const pool = dbinfo.pool;

const getProducts = () => {
  let psql = 'SELECT * FROM products p JOIN countries c ON p.p_c_id_production = c.c_id ORDER BY p.p_id ASC';

  return new Promise(function (resolve, reject) {
    pool.query(psql,
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
  })
}

const updateProduct = (p_id, body) => {
  const { p_name, p_color, p_weight_kg, p_currency, p_price, p_c_id_production, p_image_url } = body;
  let psql = 'UPDATE products SET p_name = $1, p_color = $2, p_weight_kg = $3, p_price = $4, p_c_id_production = $5, p_image_url = $6 WHERE p_id = $7 RETURNING *'

  return new Promise(function (resolve, reject) {
    pool.query(
      psql,
      [p_name, p_color, p_weight_kg, p_price, p_c_id_production, p_image_url, p_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (typeof results == 'object' && 'rows' in results) {
          resolve(results.rows)
        } else {
          resolve(`Could not modify product.`)
        }
      }
    );
  });
};

module.exports = {
  getProducts,
  updateProduct,
}