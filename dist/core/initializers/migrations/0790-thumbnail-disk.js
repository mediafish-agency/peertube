import * as Sequelize from 'sequelize';
async function up(utils) {
    const { transaction } = utils;
    {
        const data = {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        };
        await utils.queryInterface.addColumn('thumbnail', 'onDisk', data, { transaction });
    }
    {
        await utils.sequelize.query('UPDATE "thumbnail" SET "onDisk" = FALSE ' +
            'WHERE "type" = 2 AND "videoId" NOT IN (SELECT "id" FROM "video" WHERE "remote" IS FALSE)', { transaction });
    }
    {
        const data = {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: null
        };
        await utils.queryInterface.changeColumn('thumbnail', 'onDisk', data, { transaction });
    }
}
function down(options) {
    throw new Error('Not implemented.');
}
export { up, down };
//# sourceMappingURL=0790-thumbnail-disk.js.map