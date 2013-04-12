var app = {
    init: function(){
        // Show Activities
        
        app.activities.init();
        app.activities.showActivitiesList();
        
        
//        app.tasks.showTasksList('19')

//var distance = distanceFrom2Points(42, -7, 42, -8);
//                alert("distance es " + distance)
        
    }
   
};


$(document).ready(function(){
    app.init();
    
});