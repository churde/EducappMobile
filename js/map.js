app.map = {
    init: function() {

    },
    show: function(_args) {
con("en map show con args ", _args)
        app.navigation.goto('map');

        // Map Options and Map
        var mapOptions = {
            center: new google.maps.LatLng(_args.latitude, _args.longitude),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);



        var position = new google.maps.LatLng(_args.latitude, _args.longitude);
        var markerOptions = {position: position}
        marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);
        map.panTo(position);





        function placeMarker(position, draggable) {

            // Dibujamos un marcador con la ubicación del primer resultado obtenido
            var markerOptions = {position: position, draggable: draggable || true}
            marker = new google.maps.Marker(markerOptions);
            marker.setMap(map);
            map.panTo(position);

        }
    }
} 