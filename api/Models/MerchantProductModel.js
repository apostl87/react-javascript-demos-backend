const dbinfo = require('../dbinfo.js');

const pool = dbinfo.pool;

const getMerchantProducts = (mp_merchant_user_id) => {
    return new Promise(function (resolve, reject) {
        let psql = `SELECT * FROM merchant_products mp LEFT JOIN countries c ON mp.mp_c_id = c.c_id WHERE merchant_user_id = '${mp_merchant_user_id}' ORDER BY mp.mp_id ASC`;

        pool.query(psql, (error, results) => {
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
    return new Promise(function (resolve, reject) {
        const { mp_name, mp_color, mp_weight_kg, mp_price, mp_c_id_production, mp_image_url } = body;

        let psql = `UPDATE merchant_products
                SET mp_name = '${mp_name}', mp_color = '${mp_color}',
                    mp_weight_kg = '${mp_weight_kg}', mp_price = '${mp_price}', mp_c_id_production = '${mp_c_id_production}', mp_image_url = '${mp_image_url}'
                WHERE mp_merchant_user_id = '${mp_merchant_user_id}' AND mp_id = '${mp_id}'
                RETURNING *`;

        pool.query(
            psql,
            (error, results) => {
                if (error) {
                    reject(error);
                }
                // console.log(results.rows)
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
    return new Promise(function (resolve, reject) {
        const { mp_name, mp_c_id_production, mp_color, mp_weight_kg, mp_price, mp_currency, mp_image_url, mp_merchant_user_id } = body
        let psql = `INSERT INTO merchant_products (mp_name, mp_c_id_production, mp_color, mp_weight_kg, mp_price, mp_currency, mp_image_url, mp_merchant_user_id)
                VALUES ('${mp_name}', '${mp_c_id_production}', '${mp_color}', '${mp_weight_kg}', '${mp_price}', '${mp_currency}', '${mp_image_url}', '${mp_merchant_user_id}') RETURNING *;`;
        
        console.log(psql)

        pool.query(
            psql, (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                // console.log("Results ", results)
                // console.log("Type ", typeof results)
                if (typeof results == 'object' && 'rows' in results) {
                    resolve(results.rows)
                } else {
                    resolve(`Could not add product.`)
                }
            })
    })
}

const initWithTestData = (mp_merchant_user_id) => {
    let psql = require('../data_templates/init_merchant_products.js');
    psql = psql.replace(/{mp_merchant_user_id}/g, mp_merchant_user_id);

    return new Promise(function (resolve, reject) {
        pool.query(psql, (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            // console.log(results[results.length - 1])
            resolve(results[results.length - 1].rows)
        })
    })
}

const deleteMerchantProduct = (mp_merchant_user_id, mp_id) => {
    let psql = `DELETE FROM merchant_products WHERE mp_id = ${parseInt(mp_id)} and mp_merchant_user_id = '${mp_merchant_user_id}';`;
    console.log(psql)
    return new Promise(function (resolve, reject) {
        pool.query(psql, (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(`Product with id ${mp_id} deleted.`)
        })
    })
}

const deleteAllMerchantProducts = (mp_merchant_user_id) => {
    let psql = `DELETE FROM merchant_products WHERE mp_merchant_user_id = '${mp_merchant_user_id}';`
    return new Promise(function (resolve, reject) {
        pool.query(psql, (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(`All products deleted for merchant user id: ${mp_merchant_user_id}.`)
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