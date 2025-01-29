const { Router } = require("express");

const { deleteOrderQuery,getAvgPriceByUserIdQuery,getPriceByUserIdQuery,getAmountOfOrdersQuery,findAllOrdersByUserIdIfFinishQuery, findAllOrdersByUserIdQuery,addProductsToOrderQuery,updateOrderQuery,deleteProductInOrderQuery} = require("../actions/orderAction");

const ordersRouter = Router();

ordersRouter.get("/getAllOrdersByUserId/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const orders = await findAllOrdersByUserIdQuery(userId);
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.post("/addProductsToOrder", async (req, res) => {
    try {
        const { orderId, productId, productInOrederAmount } = req.body;
        await addProductsToOrderQuery({ orderId, productId, productInOrederAmount });
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.put("/updateOrder", async (req, res) => {
    try {
        const { orderId, userId, totalPrice, orderStatus } = req.body;
        await updateOrderQuery({ orderId, userId, totalPrice, orderStatus });
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.delete("/deleteProductInOrder/:orderId/:productId", async (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const productId = parseInt(req.params.productId);
        await deleteProductInOrderQuery({ orderId, productId });
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.delete("/deleteOrder/:orderId", async (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId);
        await deleteOrderQuery({ orderId });
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.get("/getAvgPriceByUserId/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const avgPrice = await getAvgPriceByUserIdQuery({ userId });
        res.status(200).send({ avgPrice });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.get("/getPriceByUserId/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const totalPrice = await getPriceByUserIdQuery({ userId });
        res.status(200).send({ totalPrice });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.get("/getAmountOfOrders/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const amountOfOrders = await getAmountOfOrdersQuery({ userId });
        res.status(200).send({ amountOfOrders });
    } catch (err) {
        res.status(500).send(err);
    }
});

ordersRouter.get("/getAllOrdersByUserIdIfFinish/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const orders = await findAllOrdersByUserIdIfFinishQuery({ userId });
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {ordersRouter};