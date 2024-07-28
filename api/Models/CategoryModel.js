const dbinfo = require('../dbinfo.js');
const config = require('../config.js');
const pool = dbinfo.pool;

const getCategories = () => {
    let psql = `
      SELECT pc_id, pc_category_name FROM product_categories
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

const getAllVariants = async () => {
    let categories = await getCategories();
    //return categories
    let results = []
    for (let category of categories) {
        let variants = await getVariantsByCategory(category.pc_id);
        variants = variants.map(variant => {
            return {
                pv_id: variant.pv_id,
                pv_variant_name: variant.pv_variant_name,
            }
        })
        let result = {
            pc_id: category.pc_id,
            pc_category_name: category.pc_category_name,
            variants: variants,
        }
        results.push(result)
    }
    return results;
}

module.exports = {
    getCategories,
    getVariantsByCategory,
    getAllVariants,
}