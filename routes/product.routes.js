const { Router } = require("express");
const {
	createProduct,
	deleteUser,
	getProduct,
	getProducts,
	updateProduct,
} = require("../controllers/product.controller");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteUser);

module.exports = router;
