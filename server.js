var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysqlConn=require('./dbconn');
// all environments
app.set('port',process.env.PORT ||80);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));    
app.use(cookieParser());
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'src')));
app.use('/node_modules/',express.static(path.join(__dirname,'node_modules')));
app.get('/', function( req, res) {
	res.render("app/index");
});
//Userrelated data from the database
app.post('/userverify',function(req,res){
    console.info(req.body);
    var sql="SELECT * FROM USER_LOGIN WHERE USER_NAME=? AND USER_PWD=?";
    global.client.query(sql,[req.body.userName,req.body.userPwd],function(err,rows){
          if(err) throw err;
          else{
              for(row in rows){
                  console.info("Row{}"+row);
              }
            res.send(rows);
          }
    });
})
//Save itemmaster table
app.post('/api/saveitemmaster',function(req,res){
    var sql="INSERT INTO ITEM_MASTER(ITEM_NAME,ITEM_DESC) VALUES(?,?)";
    var params=[req.body.itemName,req.body.itemDesc];
    global.client.query(sql,params,function(err,rows){
          if(err) throw err;
          else{
             res.send("Successfully Saved");
          }
    });
});
app.get('/api/getitemmaster',function(req,res){
    var sql="SELECT * FROM ITEM_MASTER";
    var items=[];
    global.client.query(sql,function(err,rows){
          if(err) throw err;
          else{
             for(var row in rows){
                  var item={};
                  item.itemId=rows[row].ITEM_ID;
                  item.itemName=rows[row].ITEM_NAME;
                  item.itemDesc=rows[row].ITEM_DESC;
                  items.push(item);
             }
             res.send(items);
          }
    });
})
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

