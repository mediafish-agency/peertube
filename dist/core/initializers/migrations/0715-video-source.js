async function up(utils) {
    {
        const query = `
      CREATE TABLE IF NOT EXISTS "videoSource" (
        "id"  SERIAL ,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        "filename" VARCHAR(255) DEFAULT NULL,
        "videoId" INTEGER
          REFERENCES "video" ("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        PRIMARY KEY ("id")
      );
    `;
        await utils.sequelize.query(query);
    }
}
function down(options) {
    throw new Error('Not implemented.');
}
export { up, down };
//# sourceMappingURL=0715-video-source.js.map