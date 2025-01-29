const { Router } = require("express");

const { loginUser,findAllUsersQuery,addUserQuery } = require("../actions/userActions");

const usersRouter = Router();


usersRouter.get('/login/:email/:password', async (req, res) => {
    const { email, password } = req.params;
    try {
        
        const user = await loginUser(email, password);

        if (user != null)
            res.status(200).send({success:true, user:user});
        else
            res.status(401).send({success:false, user:null});
    }
    catch (err) {
        res.status(500).send(err);
    }

})
// findUserQuery,findAllUsersQuery,addUserQuery 
usersRouter.get('/getAllUsers', async (req, res) => {
    try {
        const user = await findAllUsersQuery();
    if (user) {
        res.status(200).send({success: true, user: user});
    } else {
        res.status(401).send({success: false, user: null});
    }
}
    catch (err) {
        res.status(500).send(err);
    }
});

usersRouter.post('/addUser', async (req, res) => {
    const {userId,userName,userEmail,userPassword,userAddress,userCity,userPhonHome,userPhon,userstatus } = req.body;
    try {
        const user = await addUserQuery(userId,userName,userEmail,userPassword,userAddress,userCity,userPhonHome,userPhon,userstatus );
        if (user) {
            res.status(200).send({success: true, user: user});
        } else {
            res.status(401).send({success: false, user: null});
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = { usersRouter };