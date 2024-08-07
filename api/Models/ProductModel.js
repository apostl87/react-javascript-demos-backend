const dbinfo = require('../dbinfo.js');
const config = require('../config.js');
const pool = dbinfo.pool;

const psql_select_per_user_id = `
SELECT * FROM merchant_products mp LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
WHERE mp.mp_merchant_user_id = $1 ORDER BY mp.mp_id ASC;
`;

const getAllProducts = () => { // to be removed due to potential performance issues
    let psql = `
    SELECT * FROM merchant_products mp
	LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
	LEFT JOIN product_categories pc ON mp.mp_pc_id = pc.pc_id
    ORDER BY mp.mp_pc_id ASC
    `;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    resolve(results.rows);
                }
            })
    })
}

const getProducts = (query) => {
    // Pagination
    let { limit, offset } = query;
    limit = limit ? limit : 40;
    offset = offset ? offset : 0;

    // Sorting
    // ...

    // Filtering
    // ...

    let psql = `
    SELECT *, count(*) OVER () AS total_count FROM merchant_products mp
	LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
	LEFT JOIN product_categories pc ON mp.mp_pc_id = pc.pc_id
    ORDER BY mp.mp_pc_id ASC
    LIMIT $1
    OFFSET $2;
    `;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [limit, offset],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    resolve(results.rows);
                }
            })
    })
}

const getProduct = (product_id) => {
    let psql = `
    SELECT * FROM merchant_products mp
	LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
	LEFT JOIN product_categories pc ON mp.mp_pc_id = pc.pc_id
    WHERE mp.mp_id = $1
    `;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [product_id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    resolve(results.rows);
                }
            })
    })
}

const getProductsByCategory = (category_id) => {
    let psql = `
    SELECT * FROM merchant_products mp
	LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
	LEFT JOIN product_categories pc ON mp.mp_pc_id = pc.pc_id
    WHERE pc.pc_id = $1
    ORDER BY mp.mp_id ASC
    `;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [category_id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    resolve(results.rows);
                }
            })
    })
}


const getBestsellers = (category_id) => {
    let whereClause = ``
    let paramsArray = []
    if (category_id) {
        whereClause = ` WHERE pc.pc_id = $1`;
        paramsArray.push(category_id);
    }

    let psql = `
    SELECT * FROM merchant_products mp
	LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
	LEFT JOIN product_categories pc ON mp.mp_pc_id = pc.pc_id`;
    psql += whereClause;
    psql += ` ORDER BY RANDOM() LIMIT 4;`; // This of course does not yield bestsellers

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [...paramsArray],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                if (results) {
                    resolve(results.rows);
                }
            })
    })
}


const getMerchantProducts = (mp_merchant_user_id) => {

    let psql = psql_select_per_user_id;

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                // console.log(results);
                if (results) {
                    resolve(results.rows);
                }
            })
    })

}

const countMerchantProducts = (mp_merchant_user_id) => {
    let psql = "SELECT count(*) FROM merchant_products WHERE mp_merchant_user_id = $1";

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [mp_merchant_user_id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                //console.log(results);
                if (results) {
                    resolve(results.rows);
                }
            }
        );
    });
}

const updateMerchantProduct = async (mp_merchant_user_id, mp_id, body) => {
    const { mp_name, mp_color, mp_weight_kg, mp_price, mp_c_id_production, mp_image_url } = body;

    let psql = `UPDATE merchant_products mp
                SET mp_name = $1, mp_color = $2,mp_weight_kg = $3, mp_price = $4, mp_c_id_production = $5, mp_image_url = $6
                WHERE mp.mp_merchant_user_id = $7 AND mp.mp_id = $8;`;

    await pool.query(psql,
        [mp_name, mp_color, mp_weight_kg, mp_price, mp_c_id_production, mp_image_url, mp_merchant_user_id, mp_id],
    )

    psql = `SELECT * FROM merchant_products mp
	            LEFT JOIN countries c ON mp.mp_c_id_production = c.c_id 
	            LEFT JOIN product_categories pc ON mp.mp_pc_id = pc.pc_id
                WHERE mp.mp_merchant_user_id = $1 AND mp.mp_id = $2;`

    return new Promise(function (resolve, reject) {
        pool.query(
            psql,
            [mp_merchant_user_id, mp_id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                if (results) {
                    resolve(results.rows);
                }
            }
        );
    })
};

const createMerchantProduct = (body) => {

    return new Promise((resolve, reject) => {
        // Check the number of records before creating
        getMerchantProducts(body.mp_merchant_user_id)
            .then(response => {
                if (response.length >= config.maxProductsPerUser) {
                    reject(`Cannot create a new product. Maximum number of products (limit: ${maxProductsPerUser}) reached.`);
                } else {
                    // Create the new merchant product
                    let psql = `INSERT INTO merchant_products (mp_name, mp_c_id_production, mp_color, mp_weight_kg,
                                                                mp_price, mp_currency, mp_image_url, mp_merchant_user_id)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                                RETURNING *`;
                    const { mp_name, mp_c_id_production, mp_color, mp_weight_kg, mp_price, mp_currency, mp_image_url, mp_merchant_user_id } = body;

                    pool.query(psql,
                        [mp_name, mp_c_id_production, mp_color, mp_weight_kg, mp_price, mp_currency, mp_image_url, mp_merchant_user_id],
                        (error, results) => {
                            if (error) {
                                console.log(error);
                                reject(error);
                            }
                            if (results) {
                                resolve(results.rows);
                            }
                        });
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

const initWithTestData = (mp_merchant_user_id) => {
    return new Promise(function (resolve, reject) {
        // Check the number of records before creating
        countMerchantProducts(mp_merchant_user_id)
            .then(response => {
                // console.log(response);
                if (response[0].count > 10000) {
                    reject(`Initialization with test data aborted (10000 products already exists for this merchant (ID: ${mp_merchant_user_id}).`);
                } else {
                    // Initialize the merchant's portfolio with test data
                    let psql = require('../data_templates/init_merchant_products_latest.js');

                    pool.query(psql,
                        [mp_merchant_user_id],
                        (error, results) => {
                            if (error) {
                                console.log(error);
                                reject(error)
                            }
                            try {
                                resolve(results.rows)
                            } catch (err) {
                                console.log(err)
                                resolve(`No products added.`)
                            }
                        }
                    )
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

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
    getAllProducts,
    getProducts,
    getProduct,
    getProductsByCategory,
    getBestsellers,
    getMerchantProducts,
    createMerchantProduct,
    updateMerchantProduct,
    deleteMerchantProduct,
    deleteAllMerchantProducts,
    initWithTestData,
}