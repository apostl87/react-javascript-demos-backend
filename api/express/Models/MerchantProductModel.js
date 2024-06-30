const dbinfo = require('../dbinfo.js');

const pool = dbinfo.pool;

const getMerchantProducts = (merchant_userid) => {
    console.log(merchant_userid)
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

const updateMerchantProduct = (merchant_userid, product_id, body) => {
    return new Promise(function (resolve, reject) {

        // Interrupt the query if the product id does not belong to the logged in user
        // let psql = `SELECT id, merchant_userid FROM merchant_products WHERE id = ${product_id}`
        // pool.query(psql, (error, results) => {
        //     if (error) {
        //         reject(error);
        //     }
        //     if (results.rows[0].merchant_userid !== merchant_userid) {
        //         reject(`Product with ID: ${product_id} does not belong to user: ${merchant_userid}`);
        //     }
        // }
        // );

        const { product_name, color, weight, price, country_id, image_url } = body;

        psql = `UPDATE merchant_products SET product_name = $1, color = $2, weight_kg = $3, price = $4, country_id_production = $5, image_url = $6
                WHERE merchant_userid = '${merchant_userid}' AND id = '${product_id}'
                RETURNING *`;
        console.log(psql)
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

const createMerchantProduct = (body) => {
    return new Promise(function (resolve, reject) {
        const { product, productioncountry, color, weight_kg, price } = body
        pool.query('INSERT INTO merchant_products (product, productioncountry, color, weight_kg, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', [product, productioncountry, color, weight_kg, price], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new product has been added added: ${results.rows[0]}`)
        })
    })
}

const deleteMerchantProduct = (productId) => {
    return new Promise(function (resolve, reject) {
        const id = parseInt(productId)
        pool.query('DELETE FROM merchant_products WHERE id = $1', [id], (error, results) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(`Product deleted with ID: ${id}`)
        })
    })
}

// // For later development
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


module.exports = {
    getMerchantProducts,
    createMerchantProduct,
    deleteMerchantProduct,
    updateMerchantProduct,
}