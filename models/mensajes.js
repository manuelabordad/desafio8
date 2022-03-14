const knex = require("knex");

class Mensaje {
	constructor() {
		this.db = knex({
			client: "sqlite3",
			connection: {
				filename: "../ecommerce/mensajes.sqlite",
			},
			useNullAsDefault: true,
		});
	}

	async loadDataM() {
		await this.db.schema.createTable("messages", (table) => {
			table.increments("id");
			table.string("from");
			table.string("to");
			table.string("body");
		});

		await this.db("messages").insert({
			from: "manuela",
			to: "Brian Paul",
			body: "hola tutor",
		});

		this.db.destroy();
	}
}

module.exports = new Mensaje();
