const dbinfo = require('../dbinfo.js');

const pool = dbinfo.pool;

const getMerchantProducts = (merchant_userid) => {
    return new Promise(function (resolve, reject) {
        let psql = `SELECT * FROM merchant_products JOIN countries ON merchant_products.country_id_production = countries.country_id WHERE merchant_userid = '${merchant_userid}' ORDER BY merchant_products.id ASC`;

        pool.query(psql, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

// todo: debugging
const updateMerchantProduct = (merchant_userid, product_id, body) => {
    return new Promise(function (resolve, reject) {
        const { product_name, color, weight, price, country_id, image_url } = body;

        let psql = `UPDATE merchant_products SET product_name = $1, color = $2, weight_kg = $3, price = $4, country_id_production = $5, image_url = $6
                WHERE merchant_userid = '${merchant_userid}' AND id = '${product_id}'
                RETURNING *`;

        pool.query(
            psql,
            //"UPDATE merchant_products SET product_name = $1, color = $2, weight_kg = $3, price = $4, country_id_production = $5, image_url = $6            WHERE id = $7 RETURNING *",
            [product_name, color, weight, price, country_id, image_url],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                console.log(results.rows)
                resolve(results.rows)
                // resolve(`Product modified with ID: ${results.rows[0].id}`);
            }
        );
    });
};

// todo: implementation
const createMerchantProduct = (body) => {
    // return new Promise(function (resolve, reject) {
    //     const { product, productioncountry, color, weight_kg, price } = body
    //     pool.query('INSERT INTO merchant_products (product, productioncountry, color, weight_kg, price) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [product, productioncountry, color, weight_kg, price], (error, results) => {
    //         if (error) {
    //             reject(error)
    //         }
    //         resolve(`A new product has been added added: ${results.rows[0]}`)
    //     })
    // })
}

// Perhaps for a later version of the app
// const createProductFull = (body) => {
//     return new Promise(function (resolve, reject) {
//       const { product, productioncountry, color, usagefrequency, weight_kg, sizelength, sizewidth, sizeheight, price, image_url } = body
//       pool.query('INSERT INTO merchant_products (product, productioncountry, color, usagefrequency, weight_kg, sizelength, sizewidth, sizeheight, price, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [product, productioncountry, color, usagefrequency, weight_kg, sizelength, sizewidth, sizeheight, price, image_url], (error, results) => {
//         if (error) {
//           reject(error)
//         }
//         resolve(`A new product has been added added: ${results.rows[0]}`)
//       })
//     })
//   }

const deleteMerchantProduct = (merchant_userid, productId) => {
    let psql = `DELETE FROM merchant_products WHERE id = ${parseInt(productId)} and merchant_userid = '${merchant_userid}';`;
    console.log(psql)
    return new Promise(function (resolve, reject) {
        pool.query(psql, (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(`Product with id ${productId} deleted.`)
        })
    })
}

const deleteAllMerchantProducts = (merchant_userid) => {
    let psql = `DELETE FROM merchant_products WHERE merchant_userid = '${merchant_userid}';`
    return new Promise(function (resolve, reject) {
        pool.query(psql, (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(`All products deleted for merchant user id: ${merchant_userid}.`)
        })
    })
}

const initWithTestData = (merchant_userid) => {
    let psql = require('../../data_templates/init_merchant_products.js');
    psql = psql.replace(/{merchant_userid}/g, merchant_userid);

    return new Promise(function (resolve, reject) {
        pool.query(psql, (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            console.log(results[results.length - 1])
            resolve(results[results.length - 1].rows)
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