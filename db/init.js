// connect to admin database to create users
db = new Mongo().getDB("admin");
// create admin user
db.createUser({
  user: "adminCluster",
  pwd: "secret-pass",
  roles: [{
    role: "clusterAdmin",
    db: "admin"
  }]
});
// authenticate with admin user
db.auth("adminCluster", "secret-pass");
// switch to pois database
db = db.getSiblingDB("sejutacita");
// create non admin user in pois database (used in app)
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{
    role: "dbOwner",
    db: "sejutacita"
  }]
});
