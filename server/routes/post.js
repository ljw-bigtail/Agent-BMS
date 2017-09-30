var express = require('express');
var router = express.Router();

var User = require('../database/models/user');
var Project = require('../database/models/project');
var Deal = require('../database/models/deal');
var ProjectSub = require('../database/models/project_sub');
var Template = require('../database/models/template');

//获取账户信息
router.post('/getUser', function(req, res, next) {
	console.log("获取账户信息---------------------    " + req.body.username);
	User.findUserByName(req.body.username, (user) => {
		res.send(200, user);
	})
});

//保存账户信息
router.post('/setUser', function(req, res, next) {
	console.log("保存账户信息---------------------    " + req.body.username);
	User.setUserByName(req.body, (mes) => {
		res.send(200, {
			status: mes
		});
	})
});

//保存账户信息
router.post('/changePassword', function(req, res, next) {
	console.log("修改账户密码---------------------    " + req.body.username);
	User.changePassword(req.body, (mes) => {
		res.send(200, {
			status: mes
		});
	})
});

//校验密码的接口
router.post('/checkPassword', function(req, res, next) {
	User.findUserByName(req.body.username, (user) => {
		if (null != user) {
			User.comparePassword(req.body.password, user.pwd, (err, isMatch) => {
				if (err) {
					console.log(err)
				} else {
					if (isMatch) {
						res.send(200, {
							status: "ok",
							username: user.name
						});
					} else {
						res.send(200, {
							status: "error",
							message: "密码错误。"
						});
					}
				}
			})
		} else {
			res.send(200, {
				statuskey: "error",
				message: "用户名不存在。"
			});
		}
	});
});

//新建项目
router.post('/applyNewPro', function(req, res, next) {
	console.log("新建项目---------------------    " + req.body);
	Project.applyNewPro(req.body, (proList) => {
		res.send(200, proList);
	})
});

//发送项目列表
router.post('/getProList', function(req, res, next) {
	console.log("获取项目列表---------------------    " + req.body.username);
	Project.findProByName(req.body.username, (proList) => {
		res.send(200, proList);
	})
});

//发送项目信息
router.post('/getProData', function(req, res, next) {
	console.log("获取项目信息---------------------    " + req.body.proNum);
	Project.findProByNum(req.body.proNum, (proData) => {
		res.send(200, proData[0]);
	})
});


// 发送账单列表
router.post('/getBillList', function(req, res, next) {
	console.log("获取账单列表---------------------    " + req.body.username);
	Deal.findBillByName(req.body.username, (billList) => {
		res.send(200, billList);
	})
});

// 确认交付
router.post('/setProState', function(req, res, next) {
	Project.setProState(req.body, (mes) => {
		res.send(200, {
			status: mes
		});
	});
});

//发送项目的模板表
router.post('/getSubByName', function(req, res, next) {
	console.log("获取项目的模板表---------------------    " + req.body.proNum);
	ProjectSub.findSubByName(req.body.proNum, (subList) => {
		res.send(200, {
			subList: subList
		});
	})
});

//创建项目的模板表
router.post('/setSubByName', function(req, res, next) {
	console.log("创建项目的模板表---------------------    " + req.body.projectNum);
	ProjectSub.setSubByName(req.body, (setSubState) => {
		res.send(200, {
			status: setSubState
		});
	})
});

//发送模板表
router.post('/getTemplat', function(req, res, next) {
	Template.findTemplat((templatData) => {
		res.send(200, {
			templatList: templatData
		});
	})
});

module.exports = router;