app.activities = {
    activitiesList: null,
    data: null,
    init: function() {
        this.activitiesList = $('#activitiesList');

        if (this.activitiesList.length != 0) {
             this.load();
        }


    },
    update: function() {
        var success = function(activitiesData) {

            app.activities.data = activitiesData;
            app.activities.fill();

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
            app.activities.data = localData;
            app.activities.fill();
        }
        else {
            var success = function(activitiesData) {

                app.activities.data = activitiesData;
                app.activities.fill();

                // Saves the firstElement
                app.storage.save('activities', activitiesData);
            }

            app.server.getActivities({
                success: success
            });
        }

    },
    fill: function() {
        // Clear Container
        this.activitiesList.html('');
        var data = this.data;
        con("antes del for con this.activitiesList", this.activitiesList)
        for (var i = 0, l = data.length; i < l; i++) {
            var activity = data[i];

            var container = $('<div class="activityContainer"></div>');
            container.attr('id', activity.__activityId);

            var name = $('<label class="name"></label>');
            name.text(activity.name);

            container.append(name);

            container.appendTo(this.activitiesList);
        }

    }
}