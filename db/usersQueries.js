const { promiseQuery } = require("./sql");

const findAllUsersQuery = async () => {
    const query = `SELECT * FROM shop.users;`;
    const result = await promiseQuery(query);
    return result; 
}
const addUserQuery = async (userId,userName,userEmail,userPassword,userAddress,userCity,userPhonHome,userPhon,userstatus) => {
    console.log(userName,userEmail,userPassword,userAddress,userCity,userPhonHome,userPhon,userstatus);
    const query = `insert into users VALUES  (${userId},'${userName}', '${userEmail}', '${userPassword}','${userAddress}','${userCity}',${userPhonHome},'${userPhon}',${userstatus});`;
    const result = await promiseQuery(query);
    return result; 
}
const findUserQuery = async (userEmail, userPassword) => {
    console.log(userEmail, userPassword);
    const query = ` SELECT * FROM shop.users  WHERE userEmail = '${userEmail}'  and userPassword = '${userPassword}'; `;
    const result = await promiseQuery(query);
    return result[0]; 
 }

module.exports = { findUserQuery,findAllUsersQuery,addUserQuery }  