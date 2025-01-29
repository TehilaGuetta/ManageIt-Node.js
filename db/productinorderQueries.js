const { promiseQuery } = require("./sql");

const findAllpPoductsbyOrderIdQuery = async ({orderId}) => {
    const query = `SELECT p. productName
    FROM shop.products  p inner join shop.productinoreder o on p.productId=o.productId
    WHERE o.orderId=${orderId};`;
    const result = await promiseQuery(query);
    return result; 
}
const orderdetailsByOrderId = async (orderId) => {
    const ordersQuery = `SELECT * FROM orders WHERE orderId = ${orderId}`  //שאילתא ששולפת מערך עם כל ההזמנות (בלי מוצרים)
    const order = await promiseQuery(ordersQuery)[0];   //הפעלת השאילתא
    //נרצה לשלוף לכל הזמנה את מערך המוצרים שלה.
    //נעשה זאת ע''י הפעלת שאילתא מותאמת אישית להזמנה ששולפת את המוצרים לפי קוד ההזמנה
    //יצירת השאילתא לפי קוד ההזמנה
    const productsQuery = `SELECT o.*, p. productName,p.productDes
    FROM shop.products  p  join shop.productinoreder o on p.productId=o.productId
    WHERE o.orderId = ${order.orderId};`;
    //הפעלת השאילתא והחזרת מערך עם מוצרים
    const orderProducts = await promiseQuery(productsQuery);
    //הוספת תכונה לאובייקט ההזמנה - שבתוכה נכניס את כל מערך המוצרים
    order.products = orderProducts;
}



module.exports = { findAllpPoductsbyOrderIdQuery,orderdetailsByOrderId}  