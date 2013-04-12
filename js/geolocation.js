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


    }
}