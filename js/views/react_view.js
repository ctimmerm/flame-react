window.ReactView = Flame.View.extend({
    init: function() {
        this._super();
        var properties = this.get('reactProperties') || [];
        var length = properties.length;
        for (var i = 0; i < length; i++) {
            this.addObserver(properties[i], this, this.scheduleRerender);
        }
    },

    willDestroy: function() {
        this._super();
        var properties = this.get('reactProperties') || [];
        var length = properties.length;
        for (var i = 0; i < length; i++) {
            this.removeObserver(properties[i]);
        }
    },

    didInsertElement: function() {
        this.renderComponent();
    },

    willDestroyElement: function() {
        React.unmountComponentAtNode(this.get('element'));
    },

    scheduleRerender: function() {
        Ember.run.schedule('afterRender', this, function() {
            if (this.get('element')) this.renderComponent();
        });
    }
});
