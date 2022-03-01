let up = function(knex) {
	return knex.schema.createTable('temp', (table) => {
		table.increments()
		table.float('value', 4, 2);
		table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
};

let down = function(knex) {
	return knex.schema.dropTable('temp')
};

export { up, down }