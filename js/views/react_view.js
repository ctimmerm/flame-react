window.ReactView = Flame.View.extend({
    renderComponent: Ember.on('didInsertElement', function() {
        var element = this.get('element');
        React.render(this.get('component'), element);
    }),

    willDestroyElement: function() {
        React.unmountComponentAtNode(this.get('element'));
    },

    scheduleRerender: Ember.observer('component', function() {
        Ember.run.schedule('afterRender', this, function() {
            if (this.get('element')) this.renderComponent();
        });
    })
});
