const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB_URI, connectionParams);
		console.log("Conexión exitosa a la base de datos");
	} catch (error) {
		console.log(error);
		console.log("No se pudo conectar a la base de datos!");
	}
};