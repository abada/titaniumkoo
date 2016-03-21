/*
| ============================================================================================================ |
|   kkk      kkk      ooooo       dddddddd         eeeeeeeeee   kkk      kkk      ooooo            ooooo       |
|   kkk     kkk     ooooooooo     ddddddddddd      eeeeeeeeee   kkk     kkk     ooooooooo        ooooooooo     | 
|   kkk    kkk     ooo     ooo    ddd      ddd     eee          kkk    kkk     ooo     ooo      ooo     ooo    |
|   kkk   kkk     oooo     oooo   ddd       ddd    eee          kkk   kkk     oooo     oooo    oooo     oooo   |
|   kkk  kkk      oooo     oooo   ddd        ddd   eee          kkk  kkk      oooo     oooo    oooo     oooo   |
|   kkkkkkkk      oooo     oooo   ddd        ddd   eeeeeeeeee   kkkkkkkk      oooo     oooo    oooo     oooo   |
|   kkk  kkk      oooo     oooo   ddd        ddd   eee          kkk  kkk      oooo     oooo    oooo     oooo   |
|   kkk   kkk     oooo     oooo   ddd       ddd    eee          kkk   kkk     oooo     oooo    oooo     oooo   |
|   kkk    kkk     ooo     ooo    ddd      ddd     eee          kkk    kkk     ooo     ooo      ooo     ooo    |
|   kkk     kkk     ooooooooo     dddddddddd       eeeeeeeeee   kkk     kkk     ooooooooo        ooooooooo     |
|   kkk      kkk      ooooo       ddddddd          eeeeeeeeee   kkk      kkk      ooooo            ooooo       |
| ============================================================================================================ |
*/

//create an instance of a database
module.exports = (function() {

    //create the database object
    var db = {};

    db.database = Ti.Database.open('mydb');

    db.database.execute('CREATE TABLE IF NOT EXISTS favorites (ID INTEGER  PRIMARY KEY AUTOINCREMENT, TITLE TEXT, DESCRIPTION TEXT, LINK TEXT)');

    db.checkFavoriteRecord = function(title) {
        var sqlCheckRecord = "SELECT * FROM favorites WHERE title = '" + title + "'";
        var runCheckRecord = db.database.execute(sqlCheckRecord);

        if (runCheckRecord.rowCount > 0) {

            return false;

        } else {

            return true;

        }
    };

    db.insertFavorite = function(title, description, link) {
        var sql = "INSERT INTO favorites (title, description, link) VALUES (";
        sql = sql + "'" + title.replace("'", "''") + "', ";
        sql = sql + "'" + description.replace("'", "''") + "', ";
        sql = sql + "'" + link.replace("'", "''") + "')";
        db.database.execute(sql);
        return db.database.lastInsertRowId;
    };

    db.deleteFavorite = function(title) {
        var sql = "DELETE FROM favorites WHERE title = '" + title + "'";
        db.database.execute(sql);
    };

    db.getFavorites = function() {
        var sql = "SELECT * FROM favorites ORDER BY title ASC";
        var results = [];
        var resultSet = db.database.execute(sql);

        while (resultSet.isValidRow()) {
            results.push({
                id: resultSet.fieldByName('id'),
                title: resultSet.fieldByName('title'),
                description: resultSet.fieldByName('description'),
                data: {
                    title: resultSet.fieldByName('title'),
                    description: resultSet.fieldByName('description'),
                    link: resultSet.fieldByName('link'),
                    color: "#000",
                    height: 40
                }
            });

            resultSet.next();

        };

        //you must close the resultset
        resultSet.close();

        //finally, return our array of records!
        return results;

    };

    return db;

})();