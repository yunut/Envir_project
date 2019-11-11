var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/ctrl');

//GET 메소드 작성 
router.get('/', ctrl.index); 
router.get('/user_info', ctrl.user_info);
router.get('/use_coin', ctrl.use_coin);
router.get('/create_account',ctrl.create_form);
router.get('/machine',ctrl.get_machine);
router.get('/vd_machine',ctrl.get_vd_machine);


//POST 메소드 작성
router.post('/create', ctrl.create);
router.post('/login', ctrl.login);
router.post('/emailCheck',ctrl.emailCheck);
router.post('/process',ctrl.machine);

module.exports = router;
