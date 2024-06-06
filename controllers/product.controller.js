const mongoose = require("mongoose");
const Product = require("../models/Product");
const { req, res } = require("express");
const { validationResult } = require("express-validator");
const { uploadImage } = require("../helpers/uploadImage");

const createProduct = async (req, res) => {
	const { title, price, description, category, image } = req.body;

	try {
		const data = {
			title,
			price,
			description,
			category: category.toLowerCase(),
			image,
		};

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Image url a IMGBB
		data.image = await uploadImage(data.image, data.title);

		const product = new Product(data);
		await product.save();

		res.status(201).json(product);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Error creating product" + err);
	}
};

const getProduct = async (req, res) => {
	const { id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send("Invalid ID");
		}

		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).send("Product not found");
		}

		return res.status(200).json(product);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error getting product");
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();

		if (products.length === 0) {
			return res.status(404).send("No products found");
		}
		return res.status(200).json(products);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error getting products");
	}
};

const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { title, price, description, category, image } = req.body;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send("Invalid ID");
		}

		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).send("Product not found");
		}

		product.title = title || product.title;
		product.price = price || product.price;
		product.description = description || product.description;
		product.category = category || product.category;
		product.image =
			(await uploadImage(image, product.title)) || product.image;
		product.updateAt = Date.now();

		await product.save();
		return res.status(200).json(product);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error updating product");
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send("Invalid ID");
		}

		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).send("Product not found");
		}

		return res.status(200).json(product);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Error deleting product");
	}
};

module.exports = {
	createProduct,
	getProduct,
	getProducts,
	updateProduct,
	deleteUser,
};
