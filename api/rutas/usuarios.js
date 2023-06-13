const router = require("express").Router();
const { Usuario, validate } = require("../modelos/usuario");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const usuario = await Usuario.findOne({ email: req.body.email });
		if (usuario)
			return res
				.status(409)
				.send({ message: "El usuario con el correo electrónico ingresado ya existe!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new Usuario({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "Usuario creado con éxito" });
	} catch (error) {
		res.status(500).send({ message: "Error Interno del Servidor" });
	}
});

module.exports = router;