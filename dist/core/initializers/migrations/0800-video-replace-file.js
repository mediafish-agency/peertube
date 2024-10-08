import * as Sequelize from 'sequelize';
async function up(utils) {
    const { transaction } = utils;
    {
        const query = 'DELETE FROM "videoSource" WHERE "videoId" IS NULL';
        await utils.sequelize.query(query, { transaction });
    }
    {
        const query = 'ALTER TABLE "videoSource" ALTER COLUMN "videoId" SET NOT NULL';
        await utils.sequelize.query(query, { transaction });
    }
    {
        const data = {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null
        };
        await utils.queryInterface.addColumn('video', 'inputFileUpdatedAt', data, { transaction });
    }
}
function down(options) {
    throw new Error('Not implemented.');
}
export { up, down };
//# sourceMappingURL=0800-video-replace-file.js.map