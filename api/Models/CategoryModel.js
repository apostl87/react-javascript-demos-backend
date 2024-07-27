const dbinfo = require('../dbinfo.js');
const config = require('../config.js');
const pool = dbinfo.pool;

const getCategories = () => {
    let psql = `
      SELECT pc_id, pc_name FROM product_categories
    `

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
    })
}

const getVariantsByCategory = (category_id) => {
    let psql = `
      select pv_id, pv_pc_id, pv_variant_name from product_variants var
      join product_categories cat
      on cat.pc_id = var.pv_pc_id
      where cat.pc_id = $1
    `

    return new Promise(function (resolve, reject) {
        pool.query(psql,
            [category_id],
            (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results.rows);
            })
    })
}

module.exports = {
    getCategories,
    getVariantsByCategory,
}