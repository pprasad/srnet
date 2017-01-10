import {Component,ViewEncapsulation,Input,Output,OnChanges,ElementRef,EventEmitter } from '@angular/core';
@Component({
    selector:'print-page',
    encapsulation:ViewEncapsulation.None,
    template:'<button type="button" (click)="printDiv()" class="btn btn-primary">Print</button>',
    styles:['h3{color:}']

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
        printContents+="<div class=\"panel-body\"><div class=\"row\">";
        printContents+="<div class=\"col-xs-2\"><strong>Invoice</strong></div><div class=\"col-xs-6\">"+obj.billno+"</div></div>";
        printContents+="<div class=\"row\"><div class=\"col-xs-2\"><strong>Invoice Date</strong></div><div class=\"col-xs-6\">"+obj.billdate+"</div></div>";
        printContents+="<div class=\"row\"><div class=\"col-xs-2\"><strong>CustomerName</strong></div><div class=\"col-xs-6\">"+obj.custname+"</div></div>";
        printContents+="</div>";
        printContents+="<div class=\"row\"><div class=\"col-md-12\">";
        printContents+="<div class=\"panel-body\"><div class=\"table-responsive\">";
        printContents+="<table class=\"table table-condense\">";
        printContents+="<thead class=\"tableheader\">";
        printContents+="<tr>";
        printContents+="<td>Srno</td>";
        printContents+="<td>Name</td>";
        printContents+="<td class=\"text-center\">Quatity</td>";
        printContents+="<td class=\"text-center\">Unit Cost</td>";
        printContents+="<td class=\"text-right\">Total</td>";
        printContents+="</tr>";
        printContents+="</thead>";
        printContents+="<tbody>";
        for(let index in obj.stocksoild){
            printContents+="<tr>";
            printContents+="<td>"+(parseInt(index)+1)+"</td>";
            printContents+="<td>"+obj.stocksoild[index].itemname+"</td>";
            printContents+="<td class=\"text-center\">"+obj.stocksoild[index].qty+"</td>";
            printContents+="<td class=\"text-center\">"+obj.stocksoild[index].rate+"</td>";
            printContents+="<td class=\"text-right\">"+obj.stocksoild[index].amount+"</td>";
            printContents+="</tr>";
        }
        printContents+="</tbody>";
        printContents+="<tfoot>";
        printContents+="<tr>";
        printContents+="<td class=\"thick-line\"></td>";
        printContents+="<td class=\"thick-line\"></td>";
        printContents+="<td class=\"thick-line\"></td>";
        printContents+="<td class=\"thick-line text-right\"><label>Grand Total</label></td>";
        printContents+="<td class=\"thick-line text-right\">"+obj.totalamt+"</td>";
        printContents+="</tr>";
        printContents+="</tfoot>";
        printContents+="</table>";
        printContents+="</div></div></div></div>";
        printContents+="<div class=\"panel-body\"><div class=\"row\"><div class=\"col-xs-12 text-right\">Signature</div></div>";
        printContents+="</div>";
        if(window){
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                var popup = window.open('', '_blank','width=600,height=600,scrollbars=no,menubar=no,toolbar=no,'
                +'location=no,status=no,titlebar=no');
                popup.window.open();
                popup.document.write('<html><head>  '
        +'<link rel="stylesheet" type="text/css"  href="node_modules/bootstrap/dist/css/bootstrap.css"'
        +'media="screen,print">'
        +'<link rel="stylesheet" type="text/css"  href="app/styles/styles.css" media="screen,print">'        
        +    '</head><body onload="window.print()">'
        +'<div class="reward-body">' 
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
        +'<link rel="stylesheet" href="app/styles/styles.css" media="all">'                
        +'</head><body onload="window.print()">' + printContents + '</html>');
                popup.document.close();
            }

             popup.document.close();
            }
            return true;
        
    }
}