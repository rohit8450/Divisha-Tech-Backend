const mongoose = require('mongoose');
// const jwt = require('json-web-token');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
require('dotenv').config()
const jsonwebtoken = require('jsonwebtoken');

const sellerSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true 
    },

    businessName: {
        type: String,
        required: true 
    },

    password: {
        type: String,
        required: true 
    },
    storeInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "store"
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategory'
    }]


},{
    timestamps: true
});

sellerSchema.methods.generateAuthToken = function () {
	const token = jsonwebtoken.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const validate = (data) => {
	const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
		businessName: Joi.string().required().label("Business Name"),
		password: passwordComplexity().required().label("Password"),
        confirmPassword: passwordComplexity().required().label("Confirm Password"),
	});
	return schema.validate(data);
};

const Seller = mongoose.model('seller', sellerSchema);

module.exports= {Seller, validate};