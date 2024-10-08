import * as Sequelize from 'sequelize';
async function up(utils) {
    for (const column of ['pendingMove', 'pendingTranscode']) {
        const data = {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        };
        await utils.queryInterface.changeColumn('videoJobInfo', column, data);
    }
}
function down(options) {
    throw new Error('Not implemented.');
}
export { up, down };
//# sourceMappingURL=0670-pending-job-default.js.map