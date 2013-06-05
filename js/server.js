

app.server = {
    path: 'http://www.appio.es/xurde/Zend/projects/educapp/dev/public/api/',
    getActivities: function(_args) {

        $.ajax({
            type: 'GET',
            url: this.path + 'get-activities',
//            jsonp: 'callback',
// 'jsonp' type for CROSS DOMAIN !!! 
            dataType: 'jsonp',
            success: _args.success,
            error: function(data) {
                con("error: ", data)
            }
        });

    },
    
    sendTaskQuestions: function(_args){
        con("server sendTaskQ tengo questions ", _args.questions)
        $.ajax({
            type: 'GET',
            url: this.path + 'add-answers',
            data: {
                userId: 0,
                questions: _args.questions
            },
//            jsonp: 'callback',
// 'jsonp' type for CROSS DOMAIN !!! 
            dataType: 'jsonp',
            success: _args.success,
            error: function(data) {
                con("error: ", data)
            }
        });
        
    }
//    ajax: function(_args) {
//        $.ajax({
//            type: _args.type || 'GET',
//            // Here we have to use the oembed API, because the simple API  (e.g.  api/v2 ) don't work for private videos
//            url: _args.url,
//            jsonp: _args.jsonp || 'callback',
//            dataType: _args.dataType || 'jsonp',
//            success: _args.success || function(data) {
//
//
//            },
//            error: _args.error || function(data) {
//                con("error: ", data)
//            }
//        });
//    }
}