geodatadisplayModule.directive('datatablemeta', function (geodatadisplayModel) {
  console.log("executing datatable dir");

  //DIFF WAY
  var linker = function(scope, element, attrs, controller) {

    console.log(scope.geodatadisplayModel.geodatatable.getData3().then(function(data){
      
      var getDataObject = data;
      //console.log("DATA " + data);
      console.log(scope.geodatadisplayModel.geodatatable.getColumns().then(function(dataColumns){
    
        //console.log("Data Columns: " + dataColumns);
        var columns = [];
        var dtColumns = [];
        
        columns = Object.keys(dataColumns);
        console.log("Columns: " + columns);


        jQuery.each(columns, function(i, value){
          var obj = { sTitle: value };
          dtColumns.push(obj);
        });
      
        scope.options = {
          aoColumns: dtColumns,
          aoColumnDefs: [{
              "bSortable": true,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: getDataObject
        };

        var dataTable = element.dataTable(scope.options);
    
       // scope.$watch('options', geodatadisplayModel.displayDataset, true);

        /*function handleModelUpdates(newData) {
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