function dtCtrl($scope, $http){
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

  /*var aryJSONColTableDT = [];

  for (var i=0; i < columnsDT.length; i++ ) {
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
*/
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
                     
}