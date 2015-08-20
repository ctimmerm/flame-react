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
        this.renderComponent(this.get('element'));
    },

    willDestroyElement: function() {
        React.unmountComponentAtNode(this.get('element'));
    },

    scheduleRerender: function() {
        Ember.run.schedule('afterRender', this, function() {
            var element = this.get('element');
            if (element) this.renderComponent(element);
        });
    },

    renderComponent: function() {
        throw new Error('You need to implement renderComponent!');
    }
});
