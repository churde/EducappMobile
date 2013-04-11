app.storage = {
    init: function() {

    },
    save: function(name, jsonObject) {
        window.localStorage.setItem(name, JSON.stringify(jsonObject));
    },
    load: function(name) {
        return JSON.parse(window.localStorage.getItem(name));
    }
}