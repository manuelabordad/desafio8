(async () => {
	const express = require("express");
	const Producto = require("./models/productos");
	const Router = require("./router/router");
	const app = express();

	try {
		await Producto.loadData();

		app.use(express.json());

		app.get("/", (rq, rs) => rs.send("Hola"));

		app.use("/api/productos", router);

		app.listen(8080, () => console.log("Listening"));
	} catch (e) {
		console.log(e);
		console.log("could not start servers");
	}
})();
