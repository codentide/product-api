const { Schema, model } = require("mongoose");

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 2,
			unique: [true, "El titulo ya ha sido usado, ingrese uno diferente"],
		},
		price: {
			type: String,
			required: true,
			min: 0,
		},
		description: {
			type: String,
			required: true,
			default: "No description provided",
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model("Product", productSchema);
