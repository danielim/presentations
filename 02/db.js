exports.genDB = function(db) {
    db.run('CREATE TABLE if not exists accounts (uname TEXT, pw BLOB);')
}

exports.wipeDB = function(db) {
    db.run('DELETE FROM accounts;');
}


exports.addUser = function(db, uname, pw){
    var stmt = db.prepare('INSERT INTO accounts VALUES (?, ?)')
    stmt.run(uname, pw)
    stmt.finalize()
}

exports.getUsers = function(db, callback){
    db.all('SELECT uname, pw FROM accounts', function (err, rows) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        callback(rows);
    });
}

exports.getUser = function(db, uname, callback){
    db.get('SELECT uname, pw FROM accounts WHERE = ?', [uname], function (err, row) {
        if(err != null){
            console.log(err);
            callback(err);
        }
        callback(row);
    });
}

