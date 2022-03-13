const { Router } = require("express");
const Contenedor = require("../models/productos");

const router = Router();

router.get("/", async (req, res) => {
	const productos = await Contenedor.getAll();
	res.send(productos);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	const producto = await Contenedor.getById(id);
	if (!producto) {
		res.sendStatus(404);
	} else {
		console.log("no se encuentra el producto");
	}
});

router.post("/", async (req, res) => {
	const { body } = req;

	const id = await Contenedor.save(body);

	res.status(201).send({ id });
});

module.exports = router;
