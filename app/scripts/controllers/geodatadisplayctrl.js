'use strict';

/**
 * @ngdoc function
 * @name geodatadisplay2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the geodatadisplay2App
 */
geodatadisplayModule
  .controller('GeoDataDisplayCtrl', ['$scope','$filter','geodatadisplayModel', 'datasetModel','geodatatable', function ($scope, $filter, geodatadisplayModel, datasetModel, geodatatable, scope) {
 // 	console.log('Scope for GeoDataDisplayCtrl');
 // 	console.dir($scope);

  //  var ldata = new geodatatable();
   // console.log(ldata);
  //  $scope.pdata = ldata.getData();
 //   console.log($scope.pdata);
 var myDataset = new datasetModel();
      $scope.geodatadisplayModel = geodatadisplayModel;

      $scope.addDataset = function(){
        console.log("adding dataset");
        myDataset.src = this.url;
        myDataset.name = "new Data:";
        geodatadisplayModel.datasetRepository.datasets.push(myDataset);
      }       

     /*$scope.options = {
          aoColumns: [{
              "sTitle": "Surname"
          }, {
              "sTitle": "First Name"
          }],
          aoColumnDefs: [{
              "bSortable": true,
              "aTargets": [0, 1]
          }],
          bJQueryUI: true,
          bDestroy: true,
          aaData: [
              ["Webber", "Adam"],
              ["Bosky", "Mark"],
              ["Distler", "Rodney"],
              ["Houston", "Johnn"],
          ]
      };*/

      /*$scope.addData = function () {
          $scope.counter = $scope.counter + 1;
          $scope.options.aaData.push([$scope.counter, $scope.counter * 2]);
         // $scope.options.aoColumns.push([$scope.counter, $scope.counter * 2]);
      };*/

     // $scope.counter = 0;

	
  }]);
