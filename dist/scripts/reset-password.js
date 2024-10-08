import { program } from 'commander';
import readline from 'readline';
import { Writable } from 'stream';
import { isUserPasswordValid } from '../core/helpers/custom-validators/users.js';
import { initDatabaseModels } from '../core/initializers/database.js';
import { UserModel } from '../core/models/user/user.js';
program
    .option('-u, --user [user]', 'User')
    .parse(process.argv);
const options = program.opts();
if (options.user === undefined) {
    console.error('All parameters are mandatory.');
    process.exit(-1);
}
initDatabaseModels(true)
    .then(() => {
    return UserModel.loadByUsername(options.user);
})
    .then(user => {
    if (!user) {
        console.error('Unknown user.');
        process.exit(-1);
    }
    const mutableStdout = new Writable({
        write: function (_chunk, _encoding, callback) {
            callback();
        }
    });
    const rl = readline.createInterface({
        input: process.stdin,
        output: mutableStdout,
        terminal: true
    });
    console.log('New password?');
    rl.on('line', function (password) {
        if (!isUserPasswordValid(password)) {
            console.error('New password is invalid.');
            process.exit(-1);
        }
        user.password = password;
        user.save()
            .then(() => console.log('User password updated.'))
            .catch(err => console.error(err))
            .finally(() => process.exit(0));
    });
})
    .catch(err => {
    console.error(err);
    process.exit(-1);
});
//# sourceMappingURL=reset-password.js.map