var dbconf = {                                                                                                                         
  secure: false
}

if (process.env.VCAP_SERVICES) {
  var VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES)
  dbconf = {
    host: VCAP_SERVICES.couchdb16[0].credentials.hostname,
    port: VCAP_SERVICES.couchdb16[0].credentials.port,
    dbName: VCAP_SERVICES.couchdb16[0].credentials.dbname,
    username: VCAP_SERVICES.couchdb16[0].credentials.username,
    password: VCAP_SERVICES.couchdb16[0].credentials.password,
    secure: false
  }
}

module.exports = {
  host: dbconf.host || '54.158.46.36',
  port: dbconf.port || 5984,
  dbName: dbconf.dbName || 'ovl4zmrifzs7go1d',
  auth : {
    username: '7nbispvof2t7yemz',                                                                                                        
    password: 'j1sljggqv1y5iwlk' 
  },
  secure: dbconf.secure
}

// Only set auth member if username or password set.
if (dbconf.username || dbconf.password) {
  module.exports.auth = { username: dbconf.username, password: dbconf.password }
}

