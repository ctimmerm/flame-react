var App = Ember.Application.create();

App.RootView = Flame.View.extend({
    childViews: ['splitView'],
    myName: 'Foo',

    splitView: Flame.VerticalSplitView.extend({
        leftWidth: 250,
        minLeftWidth: 200,

        leftView: Flame.View.extend({
            childViews: ['titleView', 'textFieldView', 'buttonView'],

            titleView: Flame.LabelView.extend({
                layout: { left: 5, right: 5, top: 10 },
                textAlign: Flame.ALIGN_CENTER,
                value: 'Flame.js'
            }),

            textFieldView: Flame.TextFieldView.extend({
                layout: { left: 5, right: 5, top: 100 },
                value: Flame.computed.nearest('myName')
            }),

            buttonView: Flame.ButtonView.extend({
                layout: { left: 5, right: 5, top: 40 },
                title: 'Flame!',
                action: function() {
                    Flame.AlertPanel.info({
                        title: 'Hi!',
                        message: 'This is a Flame.AlertPanel'
                    }).popup();
                }
            })
        }),

        rightView: ReactView.extend({
            reactProperties: ['name'],
            name: Flame.computed.nearest('myName'),

            updateName: function(name) {
                this.set('name', name);
            },

            renderComponent: function(element) {
                React.render(Foo({
                    name: this.get('name'),
                    onChange: this.updateName.bind(this)
                }), element);
            }
        })
    })
});
