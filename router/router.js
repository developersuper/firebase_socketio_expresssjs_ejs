var router = require('express').Router();
var user = require('../controller/user');

router
.get('/', (req, res)=>res.redirect('/login'))
.get('/login', user.loginGet)
.post('/login', user.loginPost)
.get('/email/:uid', user.emailGet)
.post('/email/:uid', user.emailPost)
.get('/phone/:uid', user.phoneGet)
.post('/phone/:uid', user.phonePost)
.get('/end/:uid', user.endGet)
.get('/admin', user.adminGet)
.post('/admin/action', user.adminPost);

module.exports = router;