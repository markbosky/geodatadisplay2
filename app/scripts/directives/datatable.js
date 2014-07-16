geodatadisplayModule.directive('datatable', function () {
  console.log("executing datatable dir");
  

  //console.log(ndata);

   /* return {
        restrict: 'E, A, C',
        link: function (scope, element, attrs, controller) {

          /*scope.geodatadisplayModel.geodatatable.getData(function(data){
            console.log(data);
          });*/
         
         /*   var dataTable = element.dataTable(scope.options);

            scope.$watch('options.aaData', handleModelUpdates, true);

            function handleModelUpdates(newData) {
    

              newData = [
              ["Walker", "Jonny"],
              ];
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
            }
        },
        scope: {
            options: "="
        }
    }*/


//DIFF WAY
var linker = function(scope, element, attrs, controller) {

     
         /* scope.geodatadisplayModel.geodatatable.getData(function(data){
            console.log(data);
            nData = data;
          });*/
         // console.log(nData);
        /* scope.geodatadisplayModel.geodatatable.getData(function(data){
            console.log(data);
            nData = data;
          });
         console.log(nData);*/

         

         console.log(scope.geodatadisplayModel.geodatatable.getData().then(function(data){


          //console.log(data);
          var getDataObject = data;
          console.log("getDataObject: " + getDataObject);
          var getDataObjectKeys = Object.keys(getDataObject[0]);
          console.log("getDataObjectsKeys: " + getDataObjectKeys);

          var columns = [];
          jQuery.each(getDataObjectKeys, function(i, value){
            var obj = { sTitle: value };
            columns.push(obj);
          });
          console.log("columns: " + columns);
          var result = [];
          var item;
          var LISTING_RESULTS = [];
          var result2 = [];
          // Processing JSON data into an array
          for (i = 0; i < getDataObject.length; i++) {
             item = getDataObject[i];


              /*for (j = 0; j < item.length; j++) {
                //result[i] = item[j];
                console.log("Item: " + item[j]);
              }*/
              
                result.push(new Array());
                for (var k in item){
                  if (typeof item[k] !== 'function') {
                  //alert("Key is " + k + ", value is" + item[k]);
                  result[i].push(item[k]);
                  }
                }
                //console.log("result:" + result);
              

              /*for(j = 0; j < item.length; j++){

                result[i].push(thing);
              }*/
            //LISTING_RESULTS[i] = new Array(item.phone_number,item.secondary_type,item.street,item.zipcode,item.state,item.primary_type,item.subdist,item.city,item.secondary_license,item.county,item.street_number,item.primary_license,item.district,item.licensee);
              /*jQuery.each(item, function(key, value){
                var obj2 = value + ",";
                console.log(obj2);
                result.push(obj2);
              });*/
          }
          

          scope.options = {
          aoColumns: columns/*[{
              "sTitle": "Surname"
          }, {
              "sTitle": "First Name"
          }]*/,
          aoColumnDefs: [{
              "bSortable": true,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: result/*LISTING_RESULTS[
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

  
    };
    return {
        restrict: 'E, A, C',
        link: linker
        /*scope: {
            options: "="
        }*/
    };
      });