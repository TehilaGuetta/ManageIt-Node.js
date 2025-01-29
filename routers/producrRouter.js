const { Router } = require("express");

const { addProductsQuery,findAllpPoductsQuery,updaeteProductsQuery,deleteProductsQuery } = require("../actions/productAction");

const productRouter = Router();

productRouter.get('/getAllProduct', async (req, res) => {
    try {
        const products = await findAllpPoductsQuery();
        res.status(200).send({ success: true, products: products });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

productRouter.post('/addProduct', async (req, res) => {
    const {productId, productName, productDes, productImg, productPrice, isProductInShop } = req.body;
    try{
        const newProduct = await addProductsQuery(productId, productName, productDes, productImg, productPrice, isProductInShop );
        res.status(201).send({ success: true, message: 'Product added successfully', product: newProduct });
    }
    catch(error){
        res.status(500).send({ success: false, message: error.message });
    }
})

productRouter.put('/updateProduct/:productId', async (req, res) => {
    const productId  =parseInt(req.params.productId);
    const { productName, productDes, productImg, productPrice, isProductInShop } = req.body;
    try{
        const updatedProduct = await updaeteProductsQuery(productId, productName, productDes, productImg, productPrice, isProductInShop );
        res.status(200).send({ success: true, message: 'Product updated successfully', product: updatedProduct });
    }
    catch(error){
        res.status(500).send({ success: false, message: error.message });
    }
})

productRouter.delete('/deleteProduct/:productId', async (req, res) => {
    const { productId } = req.params;
    try{
        const deletedProduct = await deleteProductsQuery( productId );
        res.status(200).send({ success: true, message: 'Product deleted successfully', product: deletedProduct });
    }
    catch(error){
        res.status(500).send({ success: false, message: error.message });
    }
})

module.exports = {productRouter};