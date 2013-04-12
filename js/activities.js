app.activities = {
    activitiesListElement: null,
    activitiesData: {},
    init: function() {
        this.activitiesListElement = $('#activitiesList');
    },
    showActivitiesList: function() {
        app.navigation.goto('activitiesList');
        this.update();
    },
    update: function() {
        var success = function(activitiesData) {
//            con("activiesData ", activitiesData);

            // Proccess data
            for (var i = 0, l = activitiesData.length; i < l; i++) {
                var activity = activitiesData[i];
//                con("activity es ", activity, "activitiesData es ", app.activities.activitiesData,
//            "y id es " + String(activity.__activityId))
                app.activities.activitiesData[String(activity.__activityId)] = activity;

            }
            con("despues de procesar ", app.activities.activitiesData)
//                app.activities.activitiesData = activitiesData;

            app.activities.fillActivitiesList();

            // Saves the firstElement
            app.storage.save('activities', activitiesData);
        }

        app.server.getActivities({
            success: success
        });
    },
    load: function() {

        var localData = app.storage.load('activities');

        if (localData) {
            app.activities.activitiesData = localData;
            app.activities.fillActivitiesList();
        }
        else {
            var success = function(activitiesData) {


                // Proccess data
                for (var i = 0, l = activitiesData.length; i < l; i++) {
                    var activity = activitiesData[i];
                    app.activities.activitiesData[activity.__activityId] = activity;
                    con("despues de procesar ", app.activities.activitiesData)
                }

//                app.activities.activitiesData = activitiesData;
                app.activities.fillActivitiesList();

                // Saves the firstElement
                app.storage.save('activities', activitiesData);
            }

            app.server.getActivities({
                success: success
            });
        }

    },
    fillActivitiesList: function() {

        // Clear Container
        this.activitiesListElement.html('');
        var activitiesData = this.activitiesData;

        for (var i in activitiesData) {
            var activity = activitiesData[i];

            var container = $('<div class="activityContainer"></div>');
            container.attr('id', activity.__activityId);

            var name = $('<label class="name"></label>');
            name.text(activity.name);
            container.append(name);

            var place = $('<label class="place"></label>');
            place.text(activity.place);
            container.append(place);

            var buttonsContainer = $('<div class="buttonsContainer"></div>');
//            var btnMap = $('<button class="btnMap btn-info" \n\
//onclick="app.map.show({latitude: ' + activity.latitude + ',longitude:' + activity.longitude + '});"></button>');
//            btnMap.text('Ver Mapa');
//
//            if (activity.latitude != "" && activity.longitude != "") {
//                buttonsContainer.append(btnMap);
//            }

            var btnShow = $('<button class="btnShow btn-primary" onclick="app.activities.showActivity(' + activity.__activityId + ')"></button>');
            btnShow.text('Mostrar');


            buttonsContainer.append(btnShow);
            container.append(buttonsContainer);


            container.appendTo(this.activitiesListElement);
        }

    },
    showActivity: function(id) {

        // Clear
        app.navigation.goto('activity');
        var activityContainer = $('#activityContainer')
        activityContainer.html('');

        // Get activityData
        var activityData = this.activitiesData[id];
        var activityId = activityData.__activityId;
        
        for (var i in activityData) {

            var field = activityData[i];

            var fieldName = i;
            var fieldValue = field;

            if (fieldName === '__activityId') {
                continue;
            }

            var text = '' + fieldName.toUpperCase() + ': ' + fieldValue;
            var label = app.ui.createLabel({text: text, class: fieldName});
            activityContainer.append(label);

        }

        var buttonsContainer = $('<div class="buttonsContainer"></div>');
        
        // BACK
        var btnBack = app.ui.createButton({
            text: 'Volver',
            click: function() {

                app.activities.showActivitiesList();
                
            }
        });
        buttonsContainer.append(btnBack);

        // SHOW MAP
        if (activityData.latitude != "" && activityData.longitude != "") {
            var btnShowMap = app.ui.createButton({
                text: 'Ver Mapa',
                click: function() {
                    app.map.show({latitude: activityData.latitude, longitude: activityData.longitude});
                }
            });
            buttonsContainer.append(btnShowMap);
        }
        
        // SHOW TASKS LIST
        // BACK
        var btnShowTasks = app.ui.createButton({
            text: 'Ver Tareas',
            click: function() {
con("en ver tareas de id " + activityId)
                app.tasks.showTasksList(activityId);
                
            }
        });
        
        buttonsContainer.append(btnShowTasks);



        activityContainer.append(buttonsContainer);
    }
}