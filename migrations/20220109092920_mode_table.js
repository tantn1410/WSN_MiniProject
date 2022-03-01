export let up = function(knex) {
	return knex.schema.createTable('mode', (table) => {
		table.increments()
		table.integer('value')
		table.string('direction')
		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at').defaultTo(knex.fn.now())
	})
};

export let down = function(knex) {
	return knex.schema.dropTable('mode')
};
