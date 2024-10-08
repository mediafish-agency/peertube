async function up(utils) {
    const query = `
  CREATE TABLE IF NOT EXISTS "userExport" (
    "id" SERIAL,
    "filename" VARCHAR(255),
    "withVideoFiles" BOOLEAN NOT NULL,
    "state" INTEGER NOT NULL,
    "error" TEXT,
    "size" INTEGER,
    "storage" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
  );`;
    await utils.sequelize.query(query, { transaction: utils.transaction });
}
function down(options) {
    throw new Error('Not implemented.');
}
export { up, down };
//# sourceMappingURL=0810-user-export.js.map