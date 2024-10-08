import * as Sequelize from 'sequelize';
async function up(utils) {
    const { transaction } = utils;
    {
        const data = {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: true
        };
        await utils.queryInterface.addColumn('userNotificationSetting', 'myVideoStudioEditionFinished', data, { transaction });
    }
    {
        const query = 'UPDATE "userNotificationSetting" SET "myVideoStudioEditionFinished" = 1';
        await utils.sequelize.query(query, { transaction });
    }
    {
        const data = {
            type: Sequelize.INTEGER,
            defaultValue: null,
            allowNull: false
        };
        await utils.queryInterface.changeColumn('userNotificationSetting', 'myVideoStudioEditionFinished', data, { transaction });
    }
}
function down() {
    throw new Error('Not implemented.');
}
export { up, down };
//# sourceMappingURL=0700-edition-finished-notification.js.map