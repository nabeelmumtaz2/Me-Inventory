/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var db = null;
document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'my.db',
    location: 'default',
  });
  getData();
});

function saveItem(){
	var name=document.getElementById("name").value;
	var code=document.getElementById("code").value;
	var locationV=document.getElementById("location").value;
	var lot=document.getElementById("lot").value;
	var expiration=document.getElementById("expiration").value;
	var manufact=document.getElementById("manufact").value;
	var price=document.getElementById("price").value;
	var sell=document.getElementById("sell").value;
	var disprice=document.getElementById("disprice").value;
	var disrate=document.getElementById("disrate").value;
	var cate=document.getElementById("cate").value;
	var upc=document.getElementById("upc").value;
	var sku=document.getElementById("sku").value;
	var serialNum=document.getElementById("serialNum").value;
	var qtyR=document.getElementById("qtyR").value;
	var qtyStock=document.getElementById("qtyStock").value;
	var qtySold=document.getElementById("qtySold").value;
	var alertV=document.getElementById("alert").value;
	var reorderLevel=document.getElementById("reorderLevel").value;
	var partNum=document.getElementById("partNum").value;
	var partNam=document.getElementById("partNam").value;
	var stockNum=document.getElementById("stockNum").value;
	var cond=document.getElementById("cond").value;
	var chooseColor=document.getElementById("choose-color").value;
	var country=document.getElementById("choose-country");
	var unitType=document.getElementById("unitType").value;
	var serviceFee=document.getElementById("serviceFee").value;
	var dept=document.getElementById("dept").value;
	var shelf=document.getElementById("shelf").value;
	var bulk=document.getElementById("bulk").value;
	var weight=document.getElementById("weight").value;
	var length=document.getElementById("length").value;
	var width=document.getElementById("width").value;
	var heigth=document.getElementById("heigth").value;
	var bottle=document.getElementById("bottle").value;
	var size=document.getElementById("size").value;
	var des=document.getElementById("des").value;
	if(isEmpty(name) ||isEmpty(code) || isEmpty(locationV)||isEmpty(qtyR) ){
		alert("Please Enter Missing Values*");
		return false;
	}
    db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS items (name,code,location,lot,expiration,' +
	'manufact,price,sell,disprice,disrate,cate,upc,sku,serialNum,qtyr,qtyStock,qtySold,alert,reorderLevel,partNum,partNam,' +
	'stockNum,cond,choosecolor,country,unitType,serviceFee,dept,shelf,bulk,weight,length,width,heigth,bottle,size,des)');
    tx.executeSql('INSERT INTO items VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
	[name,code,locationV,lot,expiration,manufact,price,sell,disprice,disrate,cate,upc,sku,serialNum,qtyR,qtyStock,qtySold,alertV,reorderLevel,
	partNum,partNam,stockNum,cond,chooseColor,country,unitType,serviceFee,dept,shelf,bulk,weight,length,width,heigth,bottle,size,des]);
   // tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
  }, function(error) {
    alert('Transaction ERROR: ' +error.message);
  }, function() {
    alert('Populated database OK');
	 window.location.href = window.location.href;
  });

}
function isNotEmpty(value){
  return (value != null || value.length != 0);
}
function isEmpty(value){
  return (value == null || value.length === 0);
}
function getData(last) {
 
    db.transaction(function (tx) {
 
        var query = "SELECT name,code,location,qtyr,choosecolor FROM items";
 
        tx.executeSql(query, [], function (tx, resultSet) {
			
			var totalQty=0;
            var content = "<table>";
			content+="<th>Name</th><th>BarCode</th><th>Location</th><th>Qty Received</th>";
            for(var x = 0; x < resultSet.rows.length; x++) {
			  if(resultSet.rows.item(x).choosecolor==1){
			    content  += '<tr><td>' + resultSet.rows.item(x).name + '</td>';
			  }else if(resultSet.rows.item(x).choosecolor==2){
				content  += '<tr><td style="background:red">' +  resultSet.rows.item(x).name + '</td>';  
			  }else if(resultSet.rows.item(x).choosecolor==3){
				content  += '<tr><td style="background:yellow">' +  resultSet.rows.item(x).name + '</td>';  
			  }else if(resultSet.rows.item(x).choosecolor==4){
				content  += '<tr><td style="background:green">' +  resultSet.rows.item(x).name + '</td>';  
			  }else if(resultSet.rows.item(x).choosecolor==5){
				content  += '<tr><td style="background:orange">' +  resultSet.rows.item(x).name + '</td>';  
			  }else{
				 content  += '<tr><td>' + resultSet.rows.item(x).name + '</td>';  
			  }
			  content  += '<td>' + '<a href="">'+    resultSet.rows.item(x).code + '</a>'+ '</td>';
			  content  += '<td>' +     resultSet.rows.item(x).location + '</td>';
			  content  += '<td>' +     resultSet.rows.item(x).qtyr + '</td></tr>';

              totalQty +=  parseInt(resultSet.rows.item(x).qtyr);
            }
			content += '<tr><td>'+ 'Total:'  + '</td>';
			content += '<td>'+ '-' + '</td>';
			content += '<td>'+ '-' + '</td>';
			content += '<td>'+ totalQty + '</td></tr>';
			content += "</table>";

            $('#grid_view').append(content);
        },
        function (tx, error) {
            //alert('SELECT error: ' + error.message);
        });
    }, function (error) {
        //alert('transaction error: ' + error.message);
    }, function () {
      //  alert('transaction ok');
    });
}
function showMoreFields(){
	
	$("#showMore").toggle();
}
 var notify = function() {
  ons.notification.confirm({
    message: 'Are you sure you want to leave this page.',
    callback: function (event) {
     if(event){
          window.location.href = window.location.href;
      }
    }
});
};
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();