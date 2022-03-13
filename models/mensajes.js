const knex = require("knex");

class Mensaje {
	constructor() {
		this.db = knex(
			(this.movieDbConfig = {
				client: "sqlite3",
				connection: {
					filename: "../ecommerce/mensajes.sqlite",
				},
				useNullAsDefault: true,
			})
		);
	}

	async init() {
		await this.db.schema.createTableIfNotExists("messages", (table) => {
			table.increments("id");
			table.string("from");
			table.string("to");
			table.string("body");
		});

		await this.db("messages").insert({
			from: "",
			to: "",
			body: "",
		});

		this.db.destroy();
	}
}

module.exports = new Mensaje();
