const Category = require('../models/Category');
const { Op } = require("sequelize");
//const Utils = require('./utils');
//const bcrypt = require('bcrypt');
const { validPass } = require('./utils/VerifyUser');
const AuditTrail = require('./utils/AuditTrail');

const auditTrail = new AuditTrail(Category.getTableName());

module.exports = {
	index: async (req, res, next) => {
		try{
			var categories = await Category.findAll();
			return res.send(categories);

		} catch(error) {
			console.error('Unable to load user', error);
			return res.status(400).send('Something was wrong..., ' + error);
		}
	},

	find: async (req, res, next) => {
		try{
			const queryParams = req.body.queryParams;

			var wheres = {};
			if (queryParams.filter.catName) wheres.catName = {[Op.like]: queryParams.filter.catName+'%'};
			if (Number.isInteger(queryParams.filter.status)) wheres.status = {[Op.eq]: queryParams.filter.status};

			var categories = await Category.findAll({
				where: wheres,
				order: [
					[queryParams.sortField, queryParams.sortOrder]
				]
			});

			return res.send({entities: categories, totalCount: categories.length, queryParams:queryParams});

		} catch(error) {
			console.error('Unable to load user', error);
			return res.status(400).send('Something was wrong..., ' + error);
		}
	},

	save: async (req, res, next) => {
		try {
			const category = await Category.create(req.body.entity);
			//await category.save;
			return res.send({entity: category});

		} catch(error) {
			return res.status(404).send('Something was wrong..' + error);
		}
	},

	edit: async (req, res, next) => {
		try {
			const category = await Category.findOne( {where: { id: req.params.id }});
			//await category.update(req.body);

			return res.send(category);

		} catch(error) {
			return res.status(404).send('Something was wrong..' + error);
		}
	},

	update: async (req, res, next) => {
		try {
			const category = await Category.findOne( {where: { id: req.params.id }});
			const prevData = JSON.parse(JSON.stringify(category));
			const update = await category.update(req.body.entity);

			if (update) {
				const auditRes = await auditTrail.audit(req, prevData);
				return res.json({entity: update, audit_msg: auditRes});
			}
			return res.json({error: false, message: 'Nothing to update'});


		} catch(error) {
			return res.status(404).send('Something was wrong..' + error);
		}
	},

	delete: async (req, res, next) => {
		try {
			const category = await Category.findOne( {where: { id: req.params.id }});
			await category.destroy();

			return res.json({error: false, message: 'Successfully deleted'});

		} catch(error) {
			return res.status(404).send('Something was wrong..' + error);
		}
	},

	deleteEntityWithAuth: async (req, res, next) => {
		try {
			//check password
			const validUser = await validPass(req.body.values.password, req.user.password);
			if (!validUser) return res.status(400).json({error: true, message: 'Invalid password'});

			const category = await Category.findOne( {where: { id: req.params.id }});
			await category.destroy();

			return res.json({error: false, message: 'Successfully deleted'});

		} catch(error) {
			return res.status(404).send('Something was wrong..' + error);
		}
	},

	deleteByIds: async (req, res, next) => {
		try {
			//const category = await Category.findOne( {where: { id: req.params.id }});
			//await category.destroy();

			await Category.destroy({
			  where: {
			    id: req.body.ids
			  }
			});

			return res.json({error: false, message: 'Successfully deleted'});

		} catch(error) {
			return res.status(404).send('Something was wrong..' + error);
		}
	}
}