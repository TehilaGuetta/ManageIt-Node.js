const { Router } = require("express");

const {findAllpPoductsbyOrderIdQuery,orderdetailsByOrderId } = require("../actions/productionorderAction")

const productinorderRouter = Router();

productinorderRouter.get('/orderdetails/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const orderDetails = await orderdetailsByOrderId(orderId);
        res.status(200).send({success:true, productOrders, orderDetails});
        
    } catch (err) {
        res.status(500).send(err);
    }
})

productinorderRouter.get('/getAllProductByOrderId/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
        const productOrders = await findAllpPoductsbyOrderIdQuery({orderId});
        res.status(200).send({success:true, productOrders});
        
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = { productinorderRouter  };

