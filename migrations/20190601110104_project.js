exports.up = async function(knex) {
  await knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl
      .string("name", 128)
      .unique()
      .notNullable();
    tbl.string("description", 500).notNullable();
    tbl.boolean("completed").defaultTo(false);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("projects");
};
