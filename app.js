const express = require("express");
const cors = require("cors");


const { mySqlConnection } = require("./db/sql")
const { usersRouter } = require("./routers/userRouter");
const { productRouter } = require("./routers/producrRouter");
const { ordersRouter } = require("./routers/orderRouter");
const{productinorderRouter}= require("./routers/productinorderRouter")

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(cors());


app.use("/user", usersRouter);
app.use("/product", productRouter);
app.use("/order", ordersRouter);
app.use("/productinorder", productinorderRouter);



app.listen(PORT, (err) => {
    if (err) {
        console.log('error while runing server', err);
    }
    else
        console.log('server is runing in port', PORT);
});

mySqlConnection.connect((err) => {
    if (err)
        console.log(err);
    else
        console.log("success");
})

app.get("/hello", async (req, res) => {
    res.send("hello")
}
);

