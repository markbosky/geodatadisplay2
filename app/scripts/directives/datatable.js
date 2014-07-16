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
          //alert(getDataObject[0]);
          //console.log("getDataObject: " + getDataObject);
          var getDataObjectKeys = Object.keys(getDataObject[1]);
          var key2 = Object.keys(getDataObject);
         // console.log("getDataObjectsKeys: " + getDataObjectKeys);
          //console.log("key2: " + key2);

         // var recursiveDecoded = decodeURIComponent($.param(getDataObjectKeys));
         // alert(recursiveDecoded);
         var key3 = Object.getOwnPropertyNames(getDataObjectKeys).sort();
        // alert(key3);
          

         //var keyz = Object_keys(getDataObject);

          var keyz = [];
          for(var k in getDataObject) keyz.push(k);
          //alert("total " + keyz.length + " keys: " + keyz);

          /*if (typeof Object.keys !== "function") {
            (function() {
              Object.keys = Object_keys;
              function Object_keys(obj) {
                  var keys = [], name;
                  for (name in obj) {
                      if (obj.hasOwnProperty(name)) {
                          keys.push(name);
                      }
                  }
                  return keys;
              }
            })();
          }*/

          /*for (var key in getDataObject) {
            if (getDataObject.hasOwnProperty(key)) {
              alert(key + " -> " + getDataObject[key]);
              //console.log(key + " -> " + getDataObject[key]);
            }
          }*/

          var columns = [];
          jQuery.each(getDataObjectKeys, function(i, value){
            var obj = { sTitle: value };
            columns.push(obj);
          });
          console.log("columns: " + columns);
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

  
    };
    return {
        restrict: 'E, A, C',
        link: linker
        /*scope: {
            options: "="
        }*/
    };
      });