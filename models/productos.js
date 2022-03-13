const knex = require("knex");
const fs = require("fs/promises");
const path = require("path");

class Producto {
	constructor() {
		this.db = knex(
			(this.movieDbConfig = {
				client: "mysql",
				connection: {
					host: "localhost",
					port: 3306,
					user: "root",
					password: "root",
					database: "productos_db",
				},
			})
		);
	}

	async getAll() {
		const productos = await this.db.select().from("productos");
		console.log(productos);
		return productos;
	}

	async getById(id) {
		const movie = await this.db("movies").where({ id }).first();

		return movie;
	}

	async update(id, body) {
		console.log(id, body);
		await this.db("productos").where({ id }).update(body);
	}

	async save(body) {
		const result = await this.db("movies").insert(body);

		console.log(result[0]);

		return result[0];
	}

	async delete(id) {
		const result = await this.db("movies").where({ id }).del();
		console.log(result);
	}

	async loadData() {
		try {
			await this.db.schema.dropTableIfExists("productos");
			await this.db.schema.createTable("productos", (table) => {
				table.increments("id");
				table.string("name");
				table.integer("price");
				table.string("photo");
			});

			const raw = await fs.readFile(
				path.join(__dirname, "./data/productos.json")
			);
			const productos = JSON.parse(raw);

			for (const producto of productos) {
				console.log(producto);
				await this.db("productos").insert(producto);
			}
		} catch (e) {
			throw e;
		}
	}
}

module.exports = new Producto();
