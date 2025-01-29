const { findUserQuery,findAllUsersQuery,addUserQuery }=require ("../db/usersQueries") 

const loginUser = async (email, password) => {
    console.log("findUserQuery");
    const user = await findUserQuery(email, password);
    return user;

}
// const addUserQuery = async (user)=> {   
//     const result = await addUserQuery(user);
//     return result;
// }
module.exports = { loginUser,findAllUsersQuery,addUserQuery }