const bcrypt = require('bcrypt');

const validPass = async (requestPass, hashPass) => {
	return await bcrypt.compare(requestPass, hashPass);
}

module.exports = {validPass};