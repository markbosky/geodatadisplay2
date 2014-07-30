function testCtrl($scope, $http){
  $scope.message = '';            

  $scope.myCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {            
    $('td:eq(2)', nRow).bind('click', function() {
        $scope.$apply(function() {
            $scope.someClickHandler(aData);
        });
    });
    return nRow;
  };

  $scope.someClickHandler = function(info) {
    $scope.message = 'clicked: '+ info.price;
  };

  /*$scope.columnDefs = [ 
      { "mDataProp": "name", "aTargets":[0]},
      { "mDataProp": "price", "aTargets":[1] },
      { "mDataProp": "category", "aTargets":[2] }
  ]; */
  
  $scope.overrideOptions = {
    "bStateSave": true,
    "iCookieDuration": 2419200, /* 1 month */
    "bJQueryUI": true,
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": true,
    "bDestroy": true
  };
  $scope.columnsDT;
  var dtColumns = [];
  var result = [];
      
  $http.get('/booze-meta.json').
  success(function(data, status, headers, config) {
      $scope.dataItems = data;
      console.log($scope.sampleProductCategories);
      var jString = JSON.stringify(data);
     // console.log("stringigy: " + jString);
      obj = jQuery.parseJSON( jString );
      
      for (var i = 0; i < data.length; i++) {
          for (var prop in data[i]) {
              if (data[i].hasOwnProperty(prop)) {
                  var key = prop;
                  break;
              }
          }
      //    console.log(key);
      }
     
      $scope.keys = Object.keys(data);
      console.log("scope keys: " + $scope.keys);
      console.log("scope DataItem: ");
      console.dir($scope.dataItems);
      console.log("object: ");
      console.dir(obj);

      ///////////////////////////

      var columns = [];
      for (var i = 0; i < data.meta.view.columns.length; i++) {
          var column = data.meta.view.columns[i];
          if (column.id != -1) {
              column.positionInArray = i;
              columns[column.fieldName] = column;
          }
      }
      
      console.log("columnsTestCtrl: ");
      console.dir(columns);
      var columnsDT = Object.keys(columns);
      $scope.columnsDT = Object.keys(columns);

      //////////////////////

      
      var item;
      //console.log("data length: " + data.data[1].length);
      for (var x = 0; x < data.data.length; x++) {

          item = data.data[x];
          result.push(new Array());

          for(var i = 8; i < data.data[x].length; i++){

              if (typeof item[i] !== 'function') {
                result[x].push(item[i]);
              }
          }

      }
      console.log("Result: ");
      console.dir(result);

      $scope.DTdata = result;
      console.log("DTdata: ");
      console.dir($scope.DTdata);

      /////////////////////////

      var aryJSONColTableDT = [];

  /*for (var i=0; i < columnsDT.length; i++ ) {
    aryJSONColTableDT.push({
      "aTargets": [i],
      "mDataProp": columnsDT[i],
      "sTitle": columnsDT[i]       
     });
  };*/
  
  jQuery.each(columnsDT, function(i, value){
          var ColumnsST = { sTitle: value };
          dtColumns.push(ColumnsST);
        });

  //$scope.DTcolumnDefs = dtColumns;

  

/*for (var i=0; i < columnsDT.length; i++ ) {
    aryJSONColTableDT.push({
      "bSortable": true,
      "aTargets": [i],  
      "sTitle": columnsDT[i],  
     });
  };

  $scope.DTcolumnDefs = aryJSONColTableDT;*/
 /* $scope.DTcolumnDefs = [{
              "bSortable": true,
              "aTargets": [0, 1]
          }];


           scope.options = {
          aoColumns: dtColumns,
          aoColumnDefs: [{
              "bSortable": true,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: getDataObject
        };*/


      ////////////////


  }).
  error(function(data, status, headers, config) {
      console.log('There was an error with the request');
  });
  $scope.options = {
          aoColumns: dtColumns,
          aoColumnDefs: [{
              "bSortable": true,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: result
        };

        console.log("$SCOPE.OPTIONS");
        console.dir($scope.options);
  /*
      var json = {};
      var keys;
      json.bbox = [];
      json.crs = {};
      json.features = [];
      json.type = 'FeatureCollection';
      this.json = json;

      var columns = [];
      for (var i = 0; i < data.meta.view.columns.length; i++) {
          var column = data.meta.view.columns[i];
          if (column.id != -1) {
              column.positionInArray = i;
              columns[column.fieldName] = column;
          }
      }
      
      this.columns = columns;

    */
  
 
  products = [
    {
      "name": "1948 Porsche 356-A Roadster",
      "price": 53.9,
      "category": "Classic Cars"
    },
    {
      "name": "1948 Porsche Type 356 Roadster",
      "price": 62.16,
      "category": "Classic Cars"
    },
    {
      "name": "1949 Jaguar XK 120",
      "price": 47.25,
      "category": "Classic Cars"
    },
    {
      "name": "1936 Harley Davidson El Knucklehead",
      "price": 24.23,
      "category": "Motorcycles"
    },
    {
      "name": "1957 Vespa GS150",
      "price": 32.95,
      "category": "Motorcycles"
    },
    {
      "name": "1960 BSA Gold Star DBD34",
      "price": 37.32,
      "category": "Motorcycles"
    },
    {
      "name": "1900s Vintage Bi-Plane",
      "price": 34.25,
      "category": "Planes"
    },
    {
      "name": "1900s Vintage Tri-Plane",
      "price": 36.23,
      "category": "Planes"
    },
    {
      "name": "1928 British Royal Navy Airplane",
      "price": 66.74,
      "category": "Planes"
    },
    {
      "name": "1980s Black Hawk Helicopter",
      "price": 77.27,
      "category": "Planes"
    },
    {
      "name": "ATA: B757-300",
      "price": 59.33,
      "category": "Planes"
    }
  ];

  $scope.sampleProductCategories = products
  console.log("products: ");
  console.dir($scope.sampleProductCategories);
  var columnKeys =  Object.keys(products[1]);
  $scope.columnKeys = columnKeys;
  

  var aryJSONColTable = [];

  for (var i=0; i < columnKeys.length; i++ ) {
    aryJSONColTable.push({
      "aTargets": [i],
      "mDataProp": columnKeys[i],
      "sTitle": columnKeys[i],        
     });
  };
  $scope.columnDefs = aryJSONColTable;
  /*$scope.columnDefs = [{
   "aoColumns": columnKeys, 
    "aTargets":[0,2]
  }];*/

           
                      
}