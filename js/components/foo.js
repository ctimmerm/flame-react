var Foo = React.createClass({
    onChange: function(event) {
        this.props.onChange(event.target.value);
    },

    openPopover: function() {
        Flame.Popover.create({
            layout: { width: 500, height: 300 },
            contentView: ReactView.extend({
                component: Bar()
            })
        }).popup($(React.findDOMNode(this.refs.button)), Flame.POSITION_BELOW);
    },

    render: function() {
        return React.DOM.div({},
             'Hello from React, ' + this.props.name + '!',
             React.DOM.br(),
             React.DOM.input({
                 value: this.props.name,
                 onChange: this.onChange
             }),
             React.DOM.br(),
             Bar(),
             React.DOM.button({
                 ref: 'button',
                 onClick: this.openPopover
             }, 'Click Me!'));
    }
});

window.Foo = React.createFactory(Foo);
