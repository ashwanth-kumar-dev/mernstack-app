const express = require('express');
const routers = express.Router();
const {
    createAccount,
    checkValidUser,
    getAllAccounts,
    getAccountById,
    logoutUser,
    updateUserDetail,
} = require('../controllers/AccountControllers');

routers.post('/signup', createAccount);
routers.post('/login', checkValidUser);
routers.post('/users', getAllAccounts);
routers.post('/logout', logoutUser);
routers.get('/:id', getAccountById);
routers.patch('/updateUserDetail/:id', updateUserDetail);

module.exports = routers;