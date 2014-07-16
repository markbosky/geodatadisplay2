geodatadisplayModule.directive('geodatadisplaymap', function() {
    var linker = function(scope, element, attrs) {
       //console.log('Executing Linker function for map directive');
        var map, pos, myOptions;
        var latlng = document.getElementById("latlng");

        // Try HTML5 geolocation
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                
                latlng.innerHTML="Latitude: " + position.coords.latitude + 
                "<br>Longitude: " + position.coords.longitude;  
                myOptions = {
                    zoom: 14,
                    center: pos,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var marker = new google.maps.Marker({
                    position: pos,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7
                    },
                    map: map,
                    animation: google.maps.Animation.BOUNCE,
                    title: 'My Current Location'
                });
          
                // map.setCenter(pos);
                map = new google.maps.Map(element['0'], myOptions);
                marker.setMap(map);
                scope.geodatadisplayModel.geodatadisplaymap.map = map;
            })      
        }
        else{ 
            latlng.innerHTML = "Geolocation is not supported by this browser.";
            myOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(38.5786909, -92.1765228),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            };
                
            map = new google.maps.Map(element['0'], myOptions);
            scope.geodatadisplayModel.geodatadisplaymap.map = map;
        }           
    }
    
    return {
        restrict: 'E',
        link: linker,
        require: '^geodatadisplay',
        template: '<div></div>',
        replace: true
    };
});