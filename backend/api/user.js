const router = require('express').Router();
const { 
    register,
    login,
    getUser,  
    updateUser 
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/users/:id', getUser);  
router.put('/users/:id', updateUser);  

module.exports = router;
