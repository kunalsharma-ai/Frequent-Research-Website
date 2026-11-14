// Build 82.1: runs once, when the database volume is first created. The website's API signs in as "frapp", which
// may only read and write the website's own database (no admin rights, no other databases, cannot create users).
// The root account (MONGO_PASSWORD) is only for maintenance. For a database created before build 82.1, run the
// same command by hand (docs/go-live/17-SECURITY.md).
const dbName = process.env.MONGODB_DB || 'frequentresearch';
const pwd = process.env.MONGO_APP_PASSWORD;
if (!pwd) throw new Error('MONGO_APP_PASSWORD is not set');
db.getSiblingDB(dbName).createUser({ user: 'frapp', pwd, roles: [{ role: 'readWrite', db: dbName }] });
print('created user frapp with readWrite on ' + dbName);
