var Bar = React.createClass({
    render: function() {
        return React.DOM.div({}, 'React!');
    }
});

window.Bar = React.createFactory(Bar);
