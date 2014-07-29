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

      
  /*$http.get('/booze-meta.json').
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
     // console.log(_this.keys);
    //  console.log(data);
     // console.log(_this.data);
     console.log("getData2() has run");
  }).
  error(function(data, status, headers, config) {
      console.log('There was an error with the request');
  });
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
  console.dir($scope.sampleProductCategories);
  var columnKeys =  Object.keys(products[1]);

  //console.log("keyz: " + $scope.keys);

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