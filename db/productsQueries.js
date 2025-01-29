const { promiseQuery } = require("./sql");

const findAllpPoductsQuery = async () => {
    const query = `SELECT * FROM shop.products;`;
    const result = await promiseQuery(query);
    return result; 
}
const addProductsQuery = async (productId,productName,productDes,productImg,productPrice,isProductInShop) => {
    const query = `insert into products VALUES  (${productId},'${productName}', '${productDes}', '${productImg}',${productPrice},${isProductInShop});`;
    const result = await promiseQuery(query);
    return result; 
}
const updaeteProductsQuery = async (productId,productName,productDes,productImg,productPrice,isProductInShop) => {
    const query = ` UPDATE products SET productName='${productName}',productDes='${productDes}',productImg='${productImg}',productPrice=${productPrice},isProductInShop=${isProductInShop}  WHERE productId = ${productId}; `;
    const result = await promiseQuery(query);
    return result; 
 }
 const deleteProductsQuery = async (productId) => {
    const query = ` DELETE FROM shop.products WHERE productId = ${productId}; `;
    const result = await promiseQuery(query);
    return result; 
 }


module.exports = { addProductsQuery,findAllpPoductsQuery,updaeteProductsQuery,deleteProductsQuery }  