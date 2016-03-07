/**
 * This file may not be redistributed in whole or significant part.
 * ---------------- THIS IS NOT FREE SOFTWARE ----------------
 *
 *
 * @file        app.js
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

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#000');

function init(callback) {

    var db = require('database');

    var data = []; //empty data array

    var feedURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'https%3A%2F%2Fwww.nasa.gov%2Frss%2Fdyn%2Fearth.rss'&format=json&diagnostics=true&callback";

    //declare the http client object
    var xhr = Ti.Network.createHTTPClient();

    //define our search bar which will attach to our table view
    var searchBarHome = Ti.UI.createSearchBar({
        showCancel: true,
        height: 43,
        top: 0
    });

    //print out the searchbar value whenever it changes
    searchBarHome.addEventListener('change', function(e) {
        //search the tableview as user types
        //console.log('user searching for: ' + e.value);
    });

    //when the return key is hit, remove focus from
    //our searchBar
    searchBarHome.addEventListener('return', function(e) {
        searchBarHome.blur();
    });

    //when the cancel button is tapped, remove focus
    //from our searchBar
    searchBarHome.addEventListener('cancel', function(e) {
        searchBarHome.blur();
    });

    //create the table view
    var tblLists = Ti.UI.createTableView({

        rowHeight: 70,
        search: searchBarHome,
        filterAttribute: 'filter' //here is the search filter which appears in TableViewRow

    });

    //create a new window and pass through data from the
    //tapped row
    tblLists.addEventListener('click', function(e) {

        var data = e.row.data;
        //console.log(data);

        //row index clicked
        var detailWindow = Ti.UI.createWindow({
            title: data.title,
            backgroundColor: '#fff'
        });

        var favButton = Ti.UI.createButton({
            title: '[+] Add to favourite',
            color: '#fff',
            backgroundColor: 'green',
            font: { fontSize: 14, fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
            borderRadius: 5,
            top: 10,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });

        favButton.addEventListener('click', function(e) {
            var checkRecord = db.checkFavoriteRecord(data.title);

            if (checkRecord) {

                var newId = db.insertFavorite(data.title, data.description, data.link);
                //console.log('Newly created favorite id = ' + newId);
                detailWindow.id = newId;

                favButton.hide();

                alert('This feed has been added as a favorite!');

            } else {

                alert("This feed already exists !");

            }

        });
        detailWindow.add(favButton);

        // var image = Ti.UI.createImageView({
        //     image : data.enclosure.url,
        //     top : 60,
        //     height : '80dp',
        //     width : '80dp'
        // });
        // detailWindow.add(image);

        //finally, add the full content so we can read the whole feed
        var lblContent = Ti.UI.createWebView({
            left: 10,
            top: 60,
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            color: '#000',
            // html: data.description
            url: data.link
        });
        detailWindow.add(lblContent);

        //open the detail window
        winHome.tab.open(detailWindow);

    });

    if (Ti.Platform.name === "iPhone OS") {
        var p2r = Ti.UI.createRefreshControl({
            tintColor: '#000'
        });

        tblLists.refreshControl = p2r;

        p2r.addEventListener('refreshstart', function(e) {
            init(function() {
                p2r.endRefreshing();
            });
        });

    } else if (Ti.Platform.name === "android") {
        winHome.addEventListener("focus", init);
    }


    //this method will process the remote data
    xhr.onload = function() {

        var jsonObject = JSON.parse(this.responseText);

        console.log(jsonObject.query.results.item.length);

        for (var i = 0, j = jsonObject.query.results.item.length; i < j; i++) {

            //create a table row
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: 'list-row',
                filter: jsonObject.query.results.item[i].title //this is the data we want to search on (title)
            });

            //title label
            var titleLabel = Ti.UI.createLabel({
                text: jsonObject.query.results.item[i].title,
                font: { fontSize: 18, fontFamily: 'Helvetica Neue' },
                left: 70,
                top: 5,
                height: 20,
                width: 210
            });
            row.add(titleLabel);

            //pubDate label
            var pubDateLabel = Ti.UI.createLabel({
                text: jsonObject.query.results.item[i].pubDate,
                font: { fontSize: 18, fontFamily: 'Helvetica Neue' },
                left: 70,
                top: 25,
                height: 40,
                width: 200
            });

            if (pubDateLabel.text == '') {
                pubDateLabel.text = 'No publication date is available.';
            }

            row.add(pubDateLabel);

            //desc label
            // var descriptionLabel = Ti.UI.createLabel({
            //     text: jsonObject.query.results.item[i].description,
            //     font :{fontSize:12,justifyText:'justify',fontFamily:'Helvetica Neue'},
            //     left: 70,
            //     top: 25,
            //     height: 180,
            //     width: 200
            // });

            // if (descriptionLabel.text == '') {
            //     descriptionLabel.text = 'No description is available.';
            // }

            // row.add(descriptionLabel);

            //add our little icon to the left of the row
            var iconImage = Ti.UI.createImageView({
                image: jsonObject.query.results.item[i].enclosure.url,
                width: 50,
                height: 50,
                left: 10,
                top: 10
            });
            row.add(iconImage);

            // save an instance of the row data against the row
            row.data = jsonObject.query.results.item[i];

            //add the table row to our data[] object
            data.push(row);

        }

        //finally, set the data property of the tableView to our
        //data[] object
        tblLists.data = data;

    };

    //open up the xml feed
    xhr.open('GET', feedURL);

    //finally, execute the call to the remote feed
    xhr.send();

    // create tab group
    var tabGroup = Ti.UI.createTabGroup();

    var winHome = Ti.UI.createWindow({
        title: 'NASA Earth',
        backgroundColor: '#00a9ff'
    });
    var tabHome = Ti.UI.createTab({
        icon: 'KS_nav_ui.png',
        title: 'Home',
        window: winHome
    });
    var viewHome = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    });
    viewHome.add(tblLists);
    winHome.add(viewHome);

    var winFavorite = Ti.UI.createWindow({
        title: 'Favorites',
        backgroundColor: '#00a9ff'
    });
    var tabFavorite = Ti.UI.createTab({
        icon: 'KS_nav_ui.png',
        title: 'Favorite',
        window: winFavorite
    });
    var viewFavorite = Ti.UI.createView({
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    });
    var tblFavorites = Ti.UI.createTableView();
    viewFavorite.add(tblFavorites);
    winFavorite.add(viewFavorite);

    function loadFavorites() {
        data = [];
        //set our data object to empty
        data = db.getFavorites();
        tblFavorites.data = data;
        console.log(data);
    }

    tblFavorites.addEventListener('click', function(e) {

        var data = e.row.data;
        //console.log(data);

        //row index clicked
        var detailWindowFav = Ti.UI.createWindow({
            title: data.title,
            backgroundColor: '#fff'
        });

        //let's also add a button to remove from favourites
        var deleteButton = Ti.UI.createButton({
            title: '[-] Remove from favourite',
            color: '#fff',
            backgroundColor: 'red',
            font: { fontSize: 14, fontWeight: 'bold', fontFamily: 'Helvetica Neue' },
            borderRadius: 5,
            top: 10,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });

        deleteButton.addEventListener('click', function(e) {
            db.deleteFavorite(data.title);
            //console.log('Deleted ' + db.database.rowsAffected + ' favorite records. (id ' + data.id + ')');

            deleteButton.hide();

            alert('This feed has been removed from favorites!');
        });
        detailWindowFav.add(deleteButton);

        //finally, add the full content so we can read the whole feed
        var lblContentFav = Ti.UI.createWebView({
            left: 10,
            top: 60,
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            color: '#000',
            url: data.link
        });
        detailWindowFav.add(lblContentFav);

        //open the detail window
        winFavorite.tab.open(detailWindowFav);

    });

    //the focus event listener will ensure that the list
    //is refreshed whenever the tab is changed
    winFavorite.addEventListener('focus', loadFavorites);

    // add tab group
    tabGroup.addTab(tabHome);
    tabGroup.addTab(tabFavorite);

    // open tab group
    tabGroup.open();

    if (typeof callback === 'function') {
        callback();
    }

}

init();