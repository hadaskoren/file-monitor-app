var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users');

let getSpecificUserSql = `SELECT username, password FROM users where username = ? and password = ?`;

db.serialize(function() {
    db.get("CREATE TABLE IF NOT EXISTS users (id INT, username TEXT, password TEXT)");

    db.each("SELECT count(*) as sum FROM users", function(err, row) {
        // If Database is empty
        if(row.sum < 1) {
            var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");
            stmt.run(1, 'hadas', 1);
            stmt.run(2, 'nir', 2);
            stmt.run(3, 'michael', 3);
            stmt.finalize();
        }
    });
});

function validateCredentials(params) {
    return new Promise((resolve, reject) => {
        db.all(getSpecificUserSql, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    })
}

module.exports = {
    validateCredentials
};