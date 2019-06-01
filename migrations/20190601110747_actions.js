exports.up = async function(knex) {
  await knex.schema.createTable("actions", tbl => {
    tbl.increments();
    tbl
      .integer("project_id")
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("description", 500).notNullable();
    tbl.string("notes", 1000).notNullable();
    tbl.boolean("completed").defaultTo(false);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("actions");
};
