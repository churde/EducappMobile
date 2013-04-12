app.ui = {
    createLabel: function(_args) {

        var _class = _args.class || "";
        var text = _args.text || "";
        var label = $('<label class="' + _class + '"></label>');
        label.text(text);
        return label;
    },
    createButtonContainer: function(_args) {
        var buttonsContainer = $('<div class="buttonsContainer"></div>');
        
        if(_args.back){
            buttonsContainer.append(this.createBackButton());
        }
        
        return buttonsContainer;
    },
    createButton: function(_args) {
        var btn = $('<button class="btn-primary"></button>');
        btn.text(_args.text);
        btn.click(_args.click);

        return btn;
    },
    createBackButton: function() {


        var btn = this.createButton({text: 'Volver', click: function() {
                app.navigation.back();
            }});

        return btn;
    }

}
