const { promiseQuery } = require("./sql");

const findAllOrdersByUserIdQuery = async (userId) => {
    const query = `SELECT *
    FROM shop.orders  
    WHERE userId=${userId};`;
    const result = await promiseQuery(query);
    return result; 
}
const findAllOrdersByUserIdIfFinishQuery = async ({userId}) => {
    const query = `SELECT *
    FROM shop.orders  
    WHERE userId=${userId} AND isOrderClose =true;`;
    const result = await promiseQuery(query);
    return result; 
}
const addProductsToOrderQuery = async ({orderId,productId,productInOrederAmount}) => {
    const query = `insert into productinoreder VALUES  (${productId}, ${orderId}, ${productInOrederAmount});`;
    const result = await promiseQuery(query);
    return result; 
}
//  const updaeteProductsQuery = async ({productId,productName,productDes,productImg,productPrice,isProductInShop}) => {
//     const query = ` UPDATE products SET productName='${productName}',productDes='${productDes}',productImg='${productImg}',productPrice=${productPrice},isProductInShop=${isProductInShop} WHERE productId = ${productId}; `;
//     const result = await promiseQuery(query);
// return result;
//  }
 const updateOrderQuery = async ({orderId,orderAddres,orderDueDate}) => {
    const query = ` UPDATE shop.orders SET orderAddres='${orderAddres}',orderDueDate='${orderDueDate}' WHERE orderId = ${orderId}; `;
    const result = await promiseQuery(query);
    return result; 
 }
//  const updateProductAmountQuery = async ({productId,orderId,productInOrederAmount}) => {
//     const query = ` UPDATE shop.productinoreder SET productInOrederAmount=${productInOrederAmount} WHERE productId = ${productId} AND orderId=${orderId}; `;
//     const result = await promiseQuery(query);
//     return result; 
//  }
 const deleteProductInOrderQuery = async ({productId,orderId}) => {
    const query = ` DELETE FROM shop.productinoreder WHERE productId = ${productId} AND orderId=${orderId}; `;
    const result = await promiseQuery(query);
    return result; 
 }
 const deleteOrderQuery = async ({orderId}) => {
    const query1 = `SELECT productId FROM shop.productinoreder WHERE orderId = ${orderId}; `;
    const arr=await promiseQuery(query1);
    for(let i=0;i<arr.length;i++){
        const query2 = ` DELETE FROM shop.productinoreder WHERE productId = ${arr[i].productId} AND orderId=${orderId}; `;
        await promiseQuery(query2);
    }
    const query = ` DELETE FROM shop.orders WHERE orderId = ${orderId}  AND orderDueDate<now(); `;
    const result = await promiseQuery(query);
    return result; 
 }

const getAmountOfOrdersQuery = async ()=>{
    const query = `SELECT COUNT(*) AS totalOrders
    FROM shop.orders `;
    const result = await promiseQuery(query);
    return result; 
} 
 const getAmountOfOrdersByUserIdQuery = async({userId}) =>{
    const query = `SELECT COUNT(*) AS totalOrders
    FROM shop.orders WHERE userId=${userId};`;
    const result = await promiseQuery(query);
    return result;  
}
const getPriceByUserIdQuery = async({userId}) =>{
    const query = `SELECT sum(po.productInOrederAmount*p.productPrice)
    FROM shop.productinoreder po join products p
    on po.productId =p.productId
    where po.orderId=${userId};`;
    const result = await promiseQuery(query);
return result;}
const getAvgPriceByUserIdQuery = async({userId}) =>{
    const query = `SELECT sum(po.productInOrederAmount*p.productPrice) as sum
    FROM shop.productinoreder po join products p
    on po.productId =p.productId
    where po.orderId=${userId};`;
    const result = await promiseQuery(query);
    const avgPrice = result[0].sum / (await getAmountOfOrdersByUserIdQuery({userId})).totalOrders;
return result;}





module.exports = {deleteOrderQuery,getAvgPriceByUserIdQuery,getPriceByUserIdQuery,getAmountOfOrdersQuery,findAllOrdersByUserIdIfFinishQuery, findAllOrdersByUserIdQuery,addProductsToOrderQuery,updateOrderQuery,deleteProductInOrderQuery }  

