/*(function(angular) {
  'use strict';
  angular.module('datatablesSampleApp', ['ngResource', 'datatables']).
  controller('simpleCtrl', function($scope, DTOptionsBuilder, DTColumnBuilder) {
    $scope.reload = function() {
      $scope.dtOptions.reloadData();
    };
    $scope.changeData = function() {
      $scope.dtOptions.sAjaxSource = 'http://data.mo.gov/resource/dymb-xy5c.json';
    };

    $scope.dtOptions = DTOptionsBuilder.fromSource('http://data.mo.gov/resource/dymb-xy5c.json').withPaginationType('full_numbers');

    $scope.dtColumns = [
      DTColumnBuilder.newColumn('id').withTitle('ID'),
      DTColumnBuilder.newColumn('firstName').withTitle('First name'),
      DTColumnBuilder.newColumn('lastName').withTitle('Last name').notVisible()
    ];
  });
})(angular);*/

geodatadisplayModule.directive('datatable', function () {
  console.log("executing datatable dir");
    return {
        restrict: 'E, A, C',
        link: function (scope, element, attrs, controller) {
            var dataTable = element.dataTable(scope.options);

            scope.$watch('options.aaData', handleModelUpdates, true);

            function handleModelUpdates(newData) {
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
    }
  });