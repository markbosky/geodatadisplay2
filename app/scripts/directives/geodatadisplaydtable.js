geodatadisplayModule.directive('dtable', function() {
    var linker = function(scope, element, attrs) {
        console.log('Executing Linker function for dtable directive');

    };
    return {
        restrict: 'E',
        link: linker,
        require: '^geodatadisplay',
        scope: {}
    };
});