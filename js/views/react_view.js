/**
  This utility view helps you render React components within Flame.
  The only thing your subclass is required to do is to expose a `component` property.
  In its simplest form:

    var MyReactView = ReactView.extend({
        component: React.DOM.div(null, 'Hello from React');
    });

  Of course, having a static component isn't very useful. We can make it dynamic
  by making `component` a computed property:

    var MyReactView = ReactView.extend({
        name: null,

        component: function() {
            return React.DOM.div(null, this.get('name'));
        }.property('name')
    });

  Now whenever the name property changes, the whole React component would be rerendered
  (which is exactly what you want to happen in React).
*/
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
