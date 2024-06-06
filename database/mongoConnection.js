const mongoose = require("mongoose");

const mongoConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});
		console.log("Successful connection :D");
	} catch (error) {
		console.error("Connection error :(", error);
	}
};

module.exports = { mongoConnection };
