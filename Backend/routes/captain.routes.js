const captainController = require('../controllers/captain.controller');
const expires = require('express');
const router = expires.Router();
const {body} = require('express-validator');



router.post('/register',[
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vechical.color').notEmpty().withMessage('Vechical color is required'),    
    body('vechical.plate').notEmpty().withMessage('Vechical plate number is required'),    
    body('vechical.capacity').isInt({min:1}).withMessage('Vechical capacity must be at least 1'),    
    body('vechical.vechicalType').isIn(['car','motercycle','auto']).withMessage('Invalid vechical type'),    
],
captainController.registerCaptain

)



module.exports = router;
