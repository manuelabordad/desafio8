(async () => {
	const express = require("express");
	const Producto = require("./models/productos");
	const mensaje = require("./models/mensajes");
	const routerProd = require("./router/routerProductos");
	const app = express();

	try {
		await Producto.loadData();
		// await mensaje.loadDataM();

		app.use(express.json());

		app.use("/api/productos", routerProd);

		app.listen(8080, () => console.log("Listening"));
	} catch (e) {
		console.log(e);
		console.log("could not start servers");
	}
})();
