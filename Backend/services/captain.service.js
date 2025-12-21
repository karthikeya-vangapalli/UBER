const captionModel = require('../models/captain.model');




module.exports.createCaption = async ({ firstname,lastname, email,password,
   color, plate, capacity, vechicalType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vechicalType) {
        throw new Error('All fields are required');
    }
    const caption =captionModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vechical:{
            color,
            plate,
            capacity,
            vechicalType
        }
    })

    return caption;
}