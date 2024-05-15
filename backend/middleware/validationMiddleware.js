import Joi from 'joi';

const registerValidation = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(), // Use .email() to validate email addresses
        password: Joi.string().required(),
        isAdmin: Joi.boolean(),
        phone:Joi.string().required(),
        place:Joi.string().required(),
        role:Joi.string().required(),
        address:Joi.string().required(),
        manager:Joi.string().required(),
        profileImageUrl:Joi.string()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.message
        });
    } else {
        next();
    }
};



const loginValidation = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), 
        password: Joi.string().required(),
        isAdmin: Joi.boolean(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.message
        });
    } else {
        next();
    }
};

export { registerValidation, loginValidation };
