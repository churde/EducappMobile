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

        if (_args.back) {
            if (_args.backClick) {

                con("creo boton con backclick " + _args.backClick)
                buttonsContainer.append(this.createBackButton({click: _args.backClick}));
            }
            else {
                buttonsContainer.append(this.createBackButton());
            }
        }

        return buttonsContainer;
    },
    createButton: function(_args) {
        var btn = $('<button class="btn-primary btn-large"></button>');
        btn.text(_args.text);
        btn.click(_args.click);

        return btn;
    },
    createBackButton: function(_args) {



        var btn = this.createButton({text: 'Volver'});
        if (_args && _args.click) {
            btn.click(function() {
                _args.click();
            });
        }
        else {
            btn.click(function() {
                app.navigation.back();
            });
        }

        return btn;
    },
    createInput: function(_args) {
        var value = _args.value = "";
        var container = $('<div class="inputContainer"></div>')
        var label = app.ui.createLabel({
            text: _args.title
        });
        var input = $('<input type="text"></input>');
        input.html(value);

        container.append(label);
        container.append(input);

        return container;
    }

}
