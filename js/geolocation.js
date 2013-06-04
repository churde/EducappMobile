app.geolocation = {
    getCurrentLocation: function(_args) {



        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
        }
        con("en get current con args ", _args)
        navigator.geolocation.getCurrentPosition(_args.success, onError);


    },
    watchPosition: function(_args) {
        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        function onSuccess(position) {
            var element = document.getElementById('geolocation');
            element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                    'Longitude: ' + position.coords.longitude + '<br />' +
                    '<hr />' + element.innerHTML;
        }

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
        }

        // Options: throw an error if no update is received every 30 seconds.
        //
        var watchID = navigator.geolocation.watchPosition(_args.success, _args.error, _args.options);
    }
}