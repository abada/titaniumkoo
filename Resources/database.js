/**
 * This file may not be redistributed in whole or significant part.
 * ---------------- THIS IS NOT FREE SOFTWARE ----------------
 *
 *
 * @file        database.js
 * @package     CBN Mobile Feed Reader
 * @company     Comestoarra Labs <labs@comestoarra.com>
 * @programmer  Rizki Wisnuaji, drg., M.Kom. <rizkiwisnuaji@comestoarra.com>
 * @copyright   2016 PT. Comestoarra Bentarra Noesantarra. All Rights Reserved.
 * @license     https://comestoarra.com/license
 * @version     Release: @1.0@
 * @framework   http://appcelerator.com
 *
 *
 * ---------------- THIS IS NOT FREE SOFTWARE ----------------
 * This file may not be redistributed in whole or significant part.
 **/

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