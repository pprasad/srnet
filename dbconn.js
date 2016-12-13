var mysql      = require('mysql');
global.client=mysql.createConnection({
        host     : 'db4free.net',
            user     : 'srnet1234',
            password : 'srnet1234',
            database : 'srnet',
        });
global.client.connect();