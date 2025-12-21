const captionModel = require('../models/captain.model');
const captionService = require('../services/captain.service');
const { validationResult } = require('express-validator');




module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vechical } = req.body;

    const isCaptainAlreadyExists = await captionModel.findOne({ email });
    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captionModel.hashPassword(password);

    const caption = await captionService.createCaption({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vechical.color,
        plate: vechical.plate,
        capacity: vechical.capacity,
        vechicalType: vechical.vechicalType
    });

    const token = caption.generateAuthToken();

    res.status(201).json({
        token,
        caption,
    });
}