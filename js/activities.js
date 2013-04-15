app.activities = {
    activitiesListElement: null,
    activitiesData: {},
    init: function() {
        this.activitiesListElement = $('#activitiesList');
    },
    processActivitiesData: function(activitiesData) {
        // Proccess data
        for (var i = 0, l = activitiesData.length; i < l; i++) {
            var activity = activitiesData[i];
            app.activities.activitiesData[String(activity.__activityId)] = activity;

        }
    },
    showActivitiesList: function() {
        app.navigation.goto('activitiesList');
        this.update();
    },
    update: function() {
        var success = function(activitiesData) {

            app.activities.processActivitiesData(activitiesData);

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

                app.activities.processActivitiesData(activitiesData);

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
//            var btnShow = app.ui.createButton({
//                text: 'Mostrar',
//                click: function(){
//                    app.activities.showActivity(activity.__activityId)
//                }
//            })

            var btnShow = $('<button class="btnShow btn-primary btn-large" onclick="app.activities.showActivity(' + activity.__activityId + ')"></button>');
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

        var fieldsTitle = {
            name: 'Nombre',
            description: 'Descripción',
            place: 'Lugar',
            motivation: 'Motivación',
            target: 'Dirigido a',
            level: 'Nivel',
            group: 'Grupo',
            usersLimit: 'Número máximo de alumnos',
            difficulty: 'Dificultad',
            notes: 'Observaciones',
            previousInfo: 'Información previa',
            recommendationsBefore: 'Recomendaciones antes de la actividad',
            recommendationsAfter: 'Recomendaciones después de la actividad',
            duration: 'Duración (minutos)',
            infoBeforeInit: 'Información para cuando la actividad está a punto de comenzar',
            infoBeforeFinish: 'Información para cuando la actividad está a punto de terminar'

        }



        for (var i in activityData) {

            if (!fieldsTitle[i]) {
                continue;
            }

            var field = activityData[i];

            var fieldTitle = fieldsTitle[i];
            var fieldValue = field;



            var text = '' + fieldTitle + ': ' + fieldValue;
            var label = app.ui.createLabel({text: text, class: i});
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
                text: 'Mapa',
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

                app.tasks.showTasksList(activityId);

            }
        });

        buttonsContainer.append(btnShowTasks);

        activityContainer.append(buttonsContainer);
    }
}