const { QueryTypes } = require('sequelize');
const {sequelize} = require('../../config');

class AuditTrail {
	constructor(tableName) {
		this.auditTable = "audit_trail";
		//this.req = req;
		this.tableName = tableName;
		//this.prevData = JSON.parse(JSON.stringify(prevData));
	}

	async audit(req, prevData) { //[[]]

		let reqEntity = req.body.entity;
		const time_stamp = new Date();
		const cmnElements = [req.ipInfo.ip, req.user.id, time_stamp, time_stamp, time_stamp];

		let data = [];
		for(let item in reqEntity) {
			if (reqEntity[item] != prevData[item]) {
				data.push( ["12115", this.tableName, prevData.id, item, prevData[item], reqEntity[item], "55", 1, "Y"].concat(cmnElements) );
			}
		}

		if (data.length > 0) {
			const [results, metadata] = await sequelize.query('INSERT INTO ' + this.auditTable + ' (company_code, table_name, KEY_INFO, field_name, old_data, new_data, employee_code, status, delete_cd, ip, user, time_stamp, created_at, updated_at) VALUES ?', 
					{
						replacements: [data],//[company_code, table_name, KEY_INFO, field_name, old_data, new_data, employee_code, status, delete_cd, ip, userid, time_stamp, time_stamp, time_stamp]
						type: QueryTypes.INSERT
					}
				);

			return data.length + ' record(s) has/have been audited..';
		} else {
			return 'Nothing to audit..';
		}

	}
}

module.exports = AuditTrail;