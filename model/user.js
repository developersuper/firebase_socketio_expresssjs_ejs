
var db = require('../db').database();
var userModel = {
    find: async (options) => {
        console.log(options);
        var userRef = db.ref('server/user');
        var snapshot = await userRef.once('value');
        var users = await snapshot.val();
        if(users != null) for (var user in users) {
            if(options.username != undefined && users[user].username != undefined && users[user].username != options.username) continue;
            if(options.password != undefined && users[user].password != undefined && users[user].password != options.password) continue;
            if(options.email != undefined && users[user].email != undefined && users[user].email != options.email) continue;
            if(options.phone != undefined && users[user].phone != undefined && users[user].phone != options.phone) continue;
            console.log("found the user");
            return user;
        }
        var ref = await userRef.push({
            ...options
        });
        console.log("creating new user");
        return ref.key;
    },
    findByUid: async (uid) => {
        var userRef = db.ref('server/user/'+uid);
        var snapshot = await userRef.once('value');
        if(await snapshot.val()) return true;
        return false;
    },
    setUsername: async (uid, username) => {
        var userRef = db.ref('server/user/' + uid);
        await userRef.update({
            username
        });
    },
    setPassword: async (uid, password) => {
        var userRef = db.ref('server/user/' + uid);
        await userRef.update({
            password
        });
    },
    setEmail: async (uid, email) => {
        var userRef = db.ref('server/user/' + uid);
        await userRef.update({
            email
        });
    },
    setPhone: async (uid, phone) => {
        var userRef = db.ref('server/user/' + uid);
        await userRef.update({
            phone
        });
    },
    getAllUsers: async() => {
        var userRef = db.ref('server/user');
        var snapshot = await userRef.once('value');
        return await snapshot.val();
    },
    setStatus: async(uid, status) => {
        var userRef = db.ref('server/user/' + uid);
        if(status == 'delete') {
            await userRef.remove();
        }
        else await userRef.update({
            status: status
        });
    }
}

module.exports = userModel;