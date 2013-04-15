app.tasks = {
    showTasksList: function(activityId) {

        var tasksListElement = $('#tasksList');
        tasksListElement.html('');

        var aTasksListData = app.activities.activitiesData[activityId].tasks;

        for (var i = 0, l = aTasksListData.length; i < l; i++) {
            var taskView = this.createTaskView(aTasksListData[i]);
            tasksListElement.append(taskView);
        }

        app.navigation.goto('tasksList');

    },
    createTaskView: function(data) {
        var container = $('<div class="taskContainer"></div>');

        var name = app.ui.createLabel({
            text: data.name,
            class: data.name
        });

        container.append(name);

        var buttonsContainer = app.ui.createButtonContainer({back: true, backClick: function(){
                app.navigation.goto('activity');
        }});
        var btnDo = app.ui.createButton({
            text: 'Hacer',
            click: function() {
                app.tasks.showTask(data);
            }
        });
        buttonsContainer.append(btnDo);

        container.append(buttonsContainer);

        return container;
    },
    showTask: function(data) {
        var container = $('#taskContainer');
        container.html('');

        var name = app.ui.createLabel({
            text: data.name,
            class: 'name'
        });
        container.append(name);

        var description = app.ui.createLabel({
            text: 'Descripción: ' + data.description,
            class: 'description'
        });
        container.append(description);

        var notes = app.ui.createLabel({
            text: 'Observaciones: ' + data.notes,
            class: 'notes'
        });
        container.append(notes);

        var duration = app.ui.createLabel({
            text: 'Observaciones: ' + data.duration,
            class: 'duration'
        });
        container.append(duration);


        var myLocation = app.ui.createLabel({
            class: 'myLocation'
        });
        container.append(myLocation);

        var distanceToTarget = app.ui.createLabel({
            class: 'distanceToTarget'
        });
        container.append(distanceToTarget);
        app.geolocation.getCurrentLocation({
            success: function(position) {
                var lat = position.coords.latitude, lon = position.coords.longitude;
                myLocation.text('Tu posición es: Latitud ' + lat + ', Longitud ' + lon);

                var distance = distanceFrom2Points(data.latitude, data.longitude, lat, lon);
                distanceToTarget.text('Estás a ' + distance + ' metros de la tarea');
            }
        })

//        window.setInterval(function() {
//            app.geolocation.getCurrentLocation({
//                success: function(position) {
//                    var lat = position.coords.latitude, lon = position.coords.longitude;
//                    myLocation.text('Tu posición es: Latitud ' + lat + ', Longitud ' + lon);
//
//
//                    var distance = distanceFrom2Points(data.latitude, data.longitude, lat, lon);
//                    distanceToTarget.text('Estás a ' + distance + ' metros de la tarea');
//                }
//            });
//        }, 5000)




        container.append(app.ui.createButtonContainer({back: true}));

        app.navigation.goto('task');



    }
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}
if (typeof(String.prototype.toRad) === "undefined") {
    String.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

function distanceFrom2Points(lat1, lon1, lat2, lon2) {
    con(lat1, lon1, lat2, lon2)




    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return Math.floor(d * 1000);

}