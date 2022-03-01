let up = function(knex) {
	return knex.schema.createTable('lux', (table) => {
		table.increments()
		table.integer('value')
		table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
};

let down = function(knex) {
	return knex.schema.dropTable('lux')
};

export { up, down }