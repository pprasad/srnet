import {Component,ViewEncapsulation,Input,Output,OnChanges,ElementRef,EventEmitter } from '@angular/core';
@Component({
    selector:'print-page',
    encapsulation:ViewEncapsulation.None,
    template:'<button type="button" (click)="printDiv()" class="btn btn-primary">Print</button>'

})
export class PrintComponent{
    @Input('section') section:any;
    printDiv() {
        let obj=this.section;
        console.info(obj);
        var printContents="<div class=\"modal-header\">"; 
        printContents+="<h3><center>SRCommunications</center></h3>";
        printContents+="<center>Beside Andhra Bank,Kothur,Padalakur Road,Nellore-524004</center>";
        printContents+="</div>";
        printContents+="<div class=\"modal-body\">";
        printContents+="<div class=\"row\">";
        printContents+="<div class=\"col-xs-4 col-md-5 heading\">Invoice#<label>"+obj.billno+"</label></div>";
        printContents+="<div class=\"col-xs-4 col-md-5 heading\">Invoice Date#<label>"+obj.billdate+"</label></div>";
        printContents+="</div>";
        printContents+="<div class=\"row\">";
        printContents+="<div class=\"col-xs-4 col-md-5 heading\">CustomerName <label>"+obj.custname+"</label></div>";
        printContents+="</div>";
        printContents+="<table class=\"table table-condense\">";
        printContents+="<thead>";
        printContents+="<tr  class=\"bg-primary\">";
        printContents+="<th>Srno</th>";
        printContents+="<th>Name</th>";
        printContents+="<th>Quatity</th>";
        printContents+="<th>Unit Cost</th>";
        printContents+="<th>Total</th>";
        printContents+="</tr>";
        printContents+="</thead>";
        printContents+="<tbody>";
        for(let index in obj.stocksoild){
            printContents+="<tr>";
            printContents+="<td>"+(index+1)+"</td>";
            printContents+="<td>"+obj.stocksoild[index].itemname+"</td>";
            printContents+="<td>"+obj.stocksoild[index].qty+"</td>";
            printContents+="<td>"+obj.stocksoild[index].rate+"</td>";
            printContents+="<td>"+obj.stocksoild[index].amount+"</td>";
            printContents+="</tr>";
        }
        printContents+="</tbody>";
        printContents+="<tfoot>";
        printContents+="<tr>";
        printContents+="<td></td>";
        printContents+="<td></td>";
        printContents+="<td></td>";
        printContents+="<td>Grand Total:</td>";
        printContents+="<td>"+obj.totalamt+"</td>";
        printContents+="</tr>";
        printContents+="</tfoot>";
        printContents+="</table>";
        printContents+="</div>";
        if(window){
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                var popup = window.open('', '_blank', 
                'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,'
                +'location=no,status=no,titlebar=no');
                popup.window.focus();
                popup.document.write('<!DOCTYPE html><html><head>  '
        +'<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css"'
        +'media="screen,print">'
        +'<link rel="stylesheet" href="app/styles/styles.css" media="screen,print">'             
        +    '</head><body onload="window.print()"><div class="reward-body">' 
        + printContents +'</div></html>');
                popup.onbeforeunload = function (event) {           
                    popup.close();          
                    return '.\n';
                };
                popup.onabort = function (event) {             
                    popup.document.close();           
                    popup.close();         
                }
            } else {
                var popup = window.open('', '_blank', 'width=800,height=600');
                popup.document.open();
                popup.document.write('<html><head>'+
        +'<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css"'
        +' media="all">'
        +'<link rel="stylesheet" href="style.css" media="all">'                
        +'</head><body onload="window.print()">' + printContents + '</html>');
                popup.document.close();
            }

             popup.document.close();
            }
            return true;
        
    }
    /*Styless*/
    fetchStylesheets(){
        var output:string= '';
        for(var i=0;i<document.styleSheets.length;i++){
        output = output +' <link rel="stylesheet" type="text/css" href="'+    
                    window.document.styleSheets[0].href +'" /> ';
        }
        return output;
    }
    /*End Styles*/

}