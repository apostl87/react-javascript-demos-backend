const dbinfo = require('../dbinfo.js');
const pool = dbinfo.pool;

const psql_select_per_user_id = `
    SELECT * FROM merchant_products mp LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id
    WHERE mp.mp_merchant_user_id = $1 ORDER BY mp.mp_id ASC`;

const getMerchantProducts = (mp_merchant_user_id) => {
    let psql = psql_select_per_user_id;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (typeof results == 'object' && 'rows' in results) {
                    resolve(results.rows)
                } else {
                    resolve(`No products fetched.`)
                }
            })
    })
}

const updateMerchantProduct = (mp_merchant_user_id, mp_id, body) => {
    const { mp_name, mp_color, mp_weight_kg, mp_price, mp_c_id_production, mp_image_url } = body;

    let psql = `UPDATE merchant_products
                SET mp_name = $1, mp_color = $2,mp_weight_kg = $3, mp_price = $4, mp_c_id_production = $5, mp_image_url = $6
                WHERE mp_merchant_user_id = $7 AND mp_id = $8
                RETURNING *`;

    return new Promise(function (resolve, reject) {
        pool.query(
            psql,
            [mp_name, mp_color, mp_weight_kg, mp_price, mp_c_id_production, mp_image_url, mp_merchant_user_id, mp_id],
            (error, results) => {
                if (error) {
                    console.log(error);
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

const createMerchantProduct = (body) => {
    const { mp_name, mp_c_id_production, mp_color, mp_weight_kg, mp_price, mp_currency, mp_image_url, mp_merchant_user_id } = body;

    let psql = `INSERT INTO merchant_products (mp_name, mp_c_id_production, mp_color, mp_weight_kg,
                            mp_price, mp_currency, mp_image_url, mp_merchant_user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *`;

    return new Promise((resolve, reject) => {
        pool.query(psql,
            [mp_name, mp_c_id_production, mp_color, mp_weight_kg, mp_price, mp_currency, mp_image_url, mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                if (typeof results === 'object' && 'rows' in results) {
                    resolve(results.rows);
                } else {
                    resolve(`Could not add product.`);
                }
            });
    });
};

const initWithTestData = (mp_merchant_user_id) => {
    let psql = require('../data_templates/init_merchant_products.js');

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                try {
                    resolve(results.rows)
                } catch (e) {
                    console.log(e)
                    resolve(`No products fetched.`)
                }
            })
    })
}

const deleteMerchantProduct = (mp_merchant_user_id, mp_id) => {
    let psql = `DELETE FROM merchant_products WHERE mp_id = $1 and mp_merchant_user_id = $2;`;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [mp_id, mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                resolve(`Product with ID ${mp_id} deleted.`)
            })
    })
}

const deleteAllMerchantProducts = (mp_merchant_user_id) => {
    let psql = `DELETE FROM merchant_products WHERE mp_merchant_user_id = $1;`;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                resolve(`All products deleted for merchant user ID ${mp_merchant_user_id}.`)
            })
    })
}

module.exports = {
    getMerchantProducts,
    createMerchantProduct,
    updateMerchantProduct,
    deleteMerchantProduct,
    deleteAllMerchantProducts,
    initWithTestData,
}