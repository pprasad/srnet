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
     var sql=null;
     var params=null;
     console.info(JSON.stringify(req.body));
     var input = JSON.parse(JSON.stringify(req.body));
     if(req.body.itemId==''){
        sql="INSERT INTO ITEM_MASTER(ITEM_CODE,ITEM_NAME,ITEM_DESC) VALUES(?,?,?)";
        params=[req.body.itemCode,req.body.itemName,req.body.itemDesc];
     }else{
        var data={ITEM_CODE:input.itemCode,ITEM_NAME:input.itemName,ITEM_DESC:input.itemDesc};
        sql="UPDATE ITEM_MASTER SET ? WHERE ITEM_ID=?";
        params=[data,req.body.itemId];
     }
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
                  item.itemCode=rows[row].ITEM_CODE;
                  item.itemName=rows[row].ITEM_NAME;
                  item.itemDesc=rows[row].ITEM_DESC;
                  items.push(item);
             }
             res.send(items);
          }
    });
})
/*Save Internet Users*/
app.post('/api/savenetuser',function(req,res){
    var sql="INSERT INTO USER_INFO(FIRST_NAME,SUR_NAME,CONTACT_NO,ADDRESS) VALUES(?,?,?,?)";
    var params=[req.body.firstname,req.body.surname,req.body.mobileno,req.body.address];
    global.client.query(sql,params,function(err,rows){
          if(err) throw err;
          else{
             res.send("Successfully Saved");
          }
    });
});
app.get('/api/getuserlist',function(req,res){
     var sql="SELECT * FROM USER_INFO";
     var users=[];
     global.client.query(sql,function(err,rows){
          if(err) throw err;
          else{
             for(var row in rows){
                  var user={};
                   user.userid=rows[row].USER_ID;
                   user.firstname=rows[row].FIRST_NAME;
                   user.surname=rows[row].SUR_NAME;
                   users.push(user);
             }
             res.send(users);
          }
    });
});
app.post('/api/save/sysinfo',function(req,res){
    var obj=req.body;
    var sql="INSERT INTO SYSTEM_INFO(USER_ID,SYS_NO,SYS_DATE,SYS_HOUR,START_TIME,END_TIME,AMOUNT,PAID_AMT,BALANCE) VALUES(?,?,STR_TO_DATE(?,'%m/%d/%Y'),?,?,?,?,?,?)";
    var params=[obj.userid,obj.sysno,obj.sysdate,obj.syshour,obj.starttime,obj.endtime,obj.amount,obj.paidamt,obj.balance];
    global.client.query(sql,params,function(err,rows){
          if(err) throw err;
          else{
             res.send("Successfully Saved");
          }
    });
});
app.get('/api/get/sysinfo',function(req,res){
     var sql="SELECT * FROM SYSTEM_INFO SYS JOIN USER_INFO UINFO ON SYS.USER_ID=UINFO.USER_ID";
     var sysinfos=[];
     global.client.query(sql,function(err,rows){
           if(err) throw err;
           else{
              for(var row in rows){
                  var sysinfo={};
                   sysinfo.sysid=rows[row].SYS_ID;
                   sysinfo.userid=rows[row].USER_ID;
                   sysinfo.username=rows[row].SUR_NAME+" "+rows[row].FIRST_NAME;
                   sysinfo.sysno=rows[row].SYS_NO;
                   sysinfo.sysdate=rows[row].SYS_DATE;
                   sysinfo.syshour=rows[row].SYS_HOUR;
                   sysinfo.starttime=rows[row].START_TIME;
                   sysinfo.endtime=rows[row].END_TIME;
                   sysinfo.amount=rows[row].amount;
                   sysinfo.paidamt=rows[row].PAID_AMT;
                   sysinfo.balance=rows[row].balance;
                   sysinfos.push(sysinfo);
              }
              console.info(JSON.stringify(sysinfos));
              res.send(sysinfos);
           }
     })
})
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

