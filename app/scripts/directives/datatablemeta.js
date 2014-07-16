geodatadisplayModule.directive('datatablemeta', function () {
  console.log("executing datatable dir");

  //DIFF WAY
  var linker = function(scope, element, attrs, controller) {

    console.log(scope.geodatadisplayModel.geodatatable.getData().then(function(data){
      var getDataObject = data;
      //console.log("DATA " + data);
      
      console.log(scope.geodatadisplayModel.geodatatable.getColumns().then(function(dataColumns){
        
        //console.log("Data Columns: " + dataColumns);
        var columns = [];
        var dtColumns = [];
        
        columns = Object.keys(dataColumns);
        //console.log("Columns: " + columns);


        jQuery.each(columns, function(i, value){
          var obj = { sTitle: value };
          dtColumns.push(obj);
        });

        //console.log("DT Columns: " + dtColumns);
        var result = [];
        var item;
      
        // Processing JSON data into an array
        for (i = 0; i < getDataObject.length; i++) {
          item = getDataObject[i];   
          result.push(new Array());
        
          for (var k in item){
            if (typeof item[k] !== 'function') {
              //alert("Key is " + k + ", value is" + item[k]);
              result[i].push(item[k]);
            }
          }
          //console.log("result:" + result);
        }

        scope.options = {
          aoColumns: dtColumns,/*[{
              "sTitle": "Surname"
          }, {
              "sTitle": "First Name"
          }],*/
          aoColumnDefs: [{
              "bSortable": true,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: result/*[
            ["Webber", "Adam"],
            ["Bosky", "Mark"],
            ["Distler", "Rodney"],
            ["Houston", "Johnn"],
          ]*/
        };

        var dataTable = element.dataTable(scope.options);
    
       /* scope.$watch('options.aaData', handleModelUpdates, true);

        function handleModelUpdates(newData) {
          newData = [
          ["Walker", "Jonny"],
          ];
            var data = newData || null;
            if (data) {
                dataTable.fnClearTable();
                dataTable.fnAddData(data);
            }
        }*/
     
      }));

    }));
  };
  return {
      restrict: 'E, A, C',
      link: linker
      /*scope: {
          options: "="
      }*/
  };
});