var environment = {};


module.exports = {
	port : (process.env.VCAP_APP_PORT || 3000),
	host : (process.env.VCAP_APP_HOST || 'localhost')
}

