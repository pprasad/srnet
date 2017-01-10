var express = require('express');
var dateFormat = require('dateformat');
var http = require('http');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysqlConn=require('./dbconn');
// all environments
app.set('port',process.env.PORT ||80);
app.set('util.date','mm/dd/yyyy');
app.set('sql.date','yyyy-mm-dd');
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
    var sql="SELECT * FROM USER_LOGIN WHERE USER_NAME=? AND USER_PWD=?";
    global.client.query(sql,[req.body.userName,req.body.userPwd],function(err,rows){
          if(err) throw err;
          else{
              if(rows[0]!=undefined){
                  res.send("SUCCESS");
              }else{
                  res.send("FAILURE"); 
              }
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
app.delete('/api/delete/item',function(req,res){
  console.info("*************Delete the Item***********************");
  var sql="DELETE FROM ITEM_MASTER WHERE ITEM_ID=?";
  var params=[req.query.itemid];
   global.client.query(sql,params,function(err,rows){
          if(err)res.send(err);
          else{
              res.send("Successfully Deleted");
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
app.get('/api/getitemcodes',function(req,res){
     var sql="SELECT ITEM_CODE,ITEM_NAME FROM ITEM_MASTER";
     var items=[];
     global.client.query(sql,function(err,rows){
           if(err) throw err;
           else{
             for(var row in rows){
                  var item={};
                  item.itemCode=rows[row].ITEM_CODE;
                  item.itemName=rows[row].ITEM_NAME;
                  items.push(item);
             }
             res.send(items);
          }
     });
})
/*Save Stock  Entry*/
app.post('/api/save/stockentry',function(req,res){
      console.info("**********************Save Stock Information***************************");
      var obj=req.body;
      var sql=null;
      var params=null;
      if(obj.stockid==null||obj.stockid==''){
         sql="INSERT INTO STOCK_ENTRY(STOCK_DATE,ITEM_CODE,UNIT,QUANTITY,PRICE,RATE,AMOUNT) VALUES(STR_TO_DATE(?,'%m/%d/%Y'),?,?,?,?,?,?)";
         params=[obj.stockdate,obj.itemcode,obj.stockunit,obj.itemqty,obj.itemprice,obj.itemrate,obj.totalprice];
      }else{
         sql="UPDATE STOCK_ENTRY SET STOCK_DATE=?,ITEM_CODE=?,UNIT=?,QUANTITY=?,PRICE=?,RATE=?,AMOUNT=? WHERE STOCK_ID=?";
         params=[dateFormat(obj.stockdate,'yyyy-mm-dd'),obj.itemcode,obj.stockunit,obj.itemqty,obj.itemprice,obj.itemrate,obj.totalprice,obj.stockid];
      }
      global.client.query(sql,params,function(err,rows){
             if(err)throw err;
             else{
                 updateStockQuantity(obj);
                 res.send("Successfully Saved");
             }
      });
});
var updateStockQuantity=function(obj){
      console.info("***************Update Stock Details****************************");
      sql="SELECT * FROM STOCK_QUANTITY WHERE ITEM_CODE=?";
                 global.client.query(sql,[obj.itemcode],function(err,rows){
                       if(rows.length==0){
                            sql="INSERT INTO STOCK_QUANTITY(ITEM_CODE,QTY,RATE) VALUES(?,?,?)";
                            global.client.query(sql,[obj.itemcode,obj.itemqty,obj.itemrate]);
                       }else{
                           var qty=parseInt(rows[0].QTY);
                           var adjqty=parseInt(obj.adjqty);
                           var itemqty=parseInt(obj.itemqty);
                           if(qty<itemqty){
                               qty=(itemqty-qty)+qty;
                           }else{
                               qty=(qty-adjqty)+itemqty;
                           }
                           sql="UPDATE STOCK_QUANTITY SET QTY=?,RATE=? WHERE ITEM_CODE=?";
                           global.client.query(sql,[qty,obj.itemrate,obj.itemcode]);
                       }
      });
}
app.get('/api/get/stockentry',function(req,res){
     console.info("********************************Stock Entry**********************************");
     var sql="SELECT * FROM STOCK_ENTRY";
     var stocks=[];
     global.client.query(sql,function(err,rows){
            if(err)res.send(err);
            else{
                   for(var row in rows){
                        var stock={};
                        stock.stockid=rows[row].STOCK_ID;
                        stock.stockdate=dateFormat(rows[row].STOCK_DATE,"mm/dd/yyyy");
                        stock.itemcode=rows[row].ITEM_CODE;
                        stock.stockunit=rows[row].UNIT;
                        stock.itemqty=rows[row].QUANTITY;
                        stock.itemprice=rows[row].PRICE;
                        stock.itemrate=rows[row].RATE;
                        stock.totalprice=rows[row].AMOUNT;
                        stocks.push(stock);
                    }
                    res.send(stocks);
            }
     });
})
app.delete('/api/delete/stock',function(req,res){
  console.info("*************Delete the Item***********************");
  var sql="DELETE FROM STOCK_ENTRY WHERE STOCK_ID=?";
  var params=[req.query.stockid];
   global.client.query(sql,params,function(err,rows){
          if(err)res.send(err);
          else{
              res.send("Successfully Deleted");
          }
   });
});
//Get the itemcode ,itemname and  rates from the stock entry table
app.get('/api/get/stockitemswithrate',function(req,res){
     var sql="SELECT DISTINCT QTY.ITEM_CODE,ITM.ITEM_NAME,QTY.QTY,QTY.RATE FROM STOCK_QUANTITY QTY JOIN STOCK_ENTRY SEN ON QTY.ITEM_CODE=SEN.ITEM_CODE JOIN ITEM_MASTER ITM ON QTY.ITEM_CODE=ITM.ITEM_CODE";
     var stocks=[];
     global.client.query(sql,function(err,rows){
           if(err)res.send(err);
           else{
               for(row in rows){
                    var stock={};
                    stock.code=rows[row].ITEM_CODE;
                    stock.name=rows[row].ITEM_NAME;
                    stock.qty=rows[row].QTY;
                    stock.rate=rows[row].RATE;
                    stocks.push(stock);
               }
               res.send(stocks);
           }
     })
});
/*Save Internet Users*/
app.post('/api/savenetuser',function(req,res){
    var obj=req.body;
    var sql=null;var params=null;
    if(obj.userid==null||obj.userid==''){
        sql="INSERT INTO USER_INFO(FIRST_NAME,SUR_NAME,CONTACT_NO,ADDRESS) VALUES(?,?,?,?)";
        params=[req.body.firstname,req.body.surname,req.body.mobileno,req.body.address];
        global.client.query(sql,params,function(err,rows){
            if(err) throw err;
            else{
                res.send("Successfully Saved");
            }
        });
    }else{
        sql="UPDATE USER_INFO SET FIRST_NAME=?,SUR_NAME=?,CONTACT_NO=?,ADDRESS=? WHERE USER_ID=?";
        params=[req.body.firstname,req.body.surname,req.body.mobileno,req.body.address,req.body.userid];
        global.client.query(sql,params,function(err,rows){
            if(err) throw err;
            else{
                res.send("Successfully Updated");
            }
        });
    }
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
                   user.mobileno=rows[row].CONTACT_NO;
                   user.address=rows[row].ADDRESS;
                   users.push(user);
             }
             res.send(users);
          }
    });
});
/*Delete user*/
app.delete('/api/get/deleteuser',function(req,res){
 console.info("*************Delete the User***********************");
  var sql="DELETE FROM USER_INFO WHERE USER_ID=?";
  var params=[req.query.userid];
   global.client.query(sql,params,function(err,rows){
          if(err)res.send(err);
          else{
              res.send("Successfully Deleted");
          }
   });
});
app.post('/api/save/sysinfo',function(req,res){
    var obj=req.body;
    var sql=null;var params=null;
    if(obj.sysid==null || obj.sysid==''){
        sql="INSERT INTO SYSTEM_INFO(USER_ID,SYS_NO,SYS_DATE,SYS_HOUR,START_TIME,END_TIME,AMOUNT,PAID_AMT,BALANCE) VALUES(?,?,?,?,?,?,?,?,?)";
        params=[obj.userid,obj.sysno,dateFormat(obj.sysdate,app.get('sql.date')),obj.syshour,obj.starttime,obj.endtime,obj.amount,obj.paidamt,obj.balance];
        global.client.query(sql,params,function(err,rows){
            if(err) throw err;
            else{
                res.send("Successfully Saved");
            }
        });
    }else{
         sql="UPDATE SYSTEM_INFO SET USER_ID=?,SYS_NO=?,SYS_DATE=?,SYS_HOUR=?,START_TIME=?,END_TIME=?,AMOUNT=?,PAID_AMT=?,BALANCE=?  WHERE SYS_ID=?";
         params=[obj.userid,obj.sysno,dateFormat(obj.sysdate,app.get('sql.date')),obj.syshour,obj.starttime,obj.endtime,obj.amount,obj.paidamt,obj.balance,obj.sysid];
         global.client.query(sql,params,function(err,rows){
            if(err) throw err;
            else{
                res.send("Successfully Updated");
            }
        });
    }
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
                   sysinfo.sysdate=dateFormat(rows[row].SYS_DATE,"mm/dd/yyyy");
                   sysinfo.syshour=rows[row].SYS_HOUR;
                   sysinfo.starttime=rows[row].START_TIME;
                   sysinfo.endtime=rows[row].END_TIME;
                   sysinfo.amount=rows[row].amount;
                   sysinfo.paidamt=rows[row].PAID_AMT;
                   sysinfo.balance=rows[row].balance;
                   sysinfos.push(sysinfo);
              }
              res.send(sysinfos);
           }
     })
})
/*Delete sysinformation by using sysid*/
app.delete('/api/get/removesysinfo',function(req,res){
  console.info("*************Delete the sysinformation***********************");
  var sql="DELETE FROM SYSTEM_INFO WHERE SYS_ID=?";
  var params=[req.query.sysid];
   global.client.query(sql,params,function(err,rows){
          if(err)res.send(err);
          else{
              res.send("Successfully Deleted");
          }
   });
})
/*generate autobillno*/
app.get('/api/get/autobillno',function(req,res){
   var sql="SELECT MAX(BILL_NO)+1 BILLNO FROM CUSTOMER_BILL ORDER BY BILL_NO";
   global.client.query(sql,function(err,rows){
        if(err)res.send(err);
        else{
             res.send(rows[0]);
        }
   })
})
/*Save billinformation into CUSTOMER_BILL*/
app.post('/api/save/custbillinfo',function(req,res){
    var obj=req.body;
    var sql="INSERT INTO CUSTOMER_BILL VALUES(?,?,?,?)";
    var params=[obj.billno,dateFormat(obj.billdate,app.get('sql.date')),obj.custid,obj.totalamt];
    if(obj.billno==''||obj.billno==null){
            global.client.query(sql,params,function(err,rows){
                if(err) res.send(err);
                else{
                    var soildObjs=obj.stocksoild;
                    sql="INSERT INTO STOCK_SOILD(BILL_NO,ITEM_CODE,QTY,RATE,AMOUNT) VALUES(?,?,?,?,?)";
                    for(var index in soildObjs){
                            var soild=soildObjs[index];   
                            params=[obj.billno,soild.itemcode,soild.qty,soild.rate,soild.amount];
                            global.client.query(sql,params,function(err,rows){
                                if(err)res.send(err);console.info(err);
                            });
                    }
                    res.send("Successfully Saved");
                }
            });
    }else{
          updateCustomerBill(obj,res);
    }
})
var updateCustomerBill=function(obj,res){
    var sql="UPDATE CUSTOMER_BILL SET BILL_DATE=?,TOTAL_AMT=? WHERE BILL_NO=?";
    var params=[dateFormat(obj.billdate,app.get('sql.date')),obj.totalamt,obj.billno];
    global.client.query(sql,params,function(err,rows){
                if(err) res.send(err);
                else{
                    var soildObjs=obj.stocksoild;
                    sql="UPDATE STOCK_SOILD SET ITEM_CODE=?,QTY=?,RATE=?,AMOUNT=? WHERE BILL_NO=? AND SOILD_ID=?";
                    for(var index in soildObjs){
                            var soild=soildObjs[index];   
                            params=[soild.itemcode,soild.qty,soild.rate,soild.amount,obj.billno,soild.id];
                            global.client.query(sql,params,function(err,rows){
                                if(err)res.send(err);console.info(err);
                            });
                    }
                    res.send("Successfully Updated");
                }
    });
}
/*get existing billing information*/
app.get('/api/getbilldetails',function(req,res){
    var billinfos={};
    billinfos.stocksoild=[];
    var sql="SELECT * FROM CUSTOMER_BILL CB JOIN USER_INFO UINFO ON UINFO.USER_ID=CB.CUST_ID WHERE CB.BILL_NO=?";
    var params=[req.query.billno];
    global.client.query(sql,params,function(err,rows){
           billinfos.billno=rows[0].BILL_NO;
           billinfos.billdate=dateFormat(rows[0].BILL_DATE,"mm/dd/yyyy");
           billinfos.custid=rows[0].CUST_ID;
           billinfos.custname=rows[0].SUR_NAME+rows[0].FIRST_NAME;
           billinfos.totalamt=rows[0].TOTAL_AMT;
           sql="SELECT * FROM STOCK_SOILD ST JOIN ITEM_MASTER ITM ON  ITM.ITEM_CODE=ST.ITEM_CODE WHERE ST.BILL_NO=?";
           global.client.query(sql,params,function(err,rows){
                for(var row in rows){
                   var stocks={};
                   stocks.id=rows[row].SOILD_ID;
                   stocks.itemcode=rows[row].ITEM_CODE;
                   stocks.itemname=rows[row].ITEM_NAME;
                   stocks.qty=rows[row].QTY;
                   stocks.rate=rows[row].RATE;
                   stocks.amount=rows[row].AMOUNT;
                   console.info(stocks);
                   billinfos.stocksoild.push(stocks);
                }
                res.send(billinfos);
           });
    });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

