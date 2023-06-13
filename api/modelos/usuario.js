const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const usuarioSchema = new mongoose.Schema({
	Nombre: { type: String, required: true },
	Apellido: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

usuarioSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_LLAVE_PRIVADA, {
		expiresIn: "7d",
	});
	return token;
};

const Usuario = mongoose.model("usuario", usuarioSchema);

const validate = (data) => {
	const schema = Joi.object({
		Nombre: Joi.string().required().label("Nombre"),
		Apellido: Joi.string().required().label("Apellido"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Contraseña"),
	});
	return schema.validate(data);
};

module.exports = { Usuario, validate };