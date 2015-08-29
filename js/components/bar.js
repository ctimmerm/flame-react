var Bar = React.createClass({
    render: function() {
        return React.DOM.div({}, 'This is rendered with React!');
    }
});

window.Bar = React.createFactory(Bar);
