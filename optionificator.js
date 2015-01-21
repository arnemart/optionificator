
function e(type, params, children) {
    var element = document.createElement(type);
    for (var param in params) {
        element[param] = params[param];
    }
    (children || []).forEach(function(child) {
        element.appendChild(child);
    });
    return element;
}

var elementTypes = {
    slider: function(name, description, value, min, max, step) {
        min = (min == null) ? 0 : min;
        value = (value == null) ? min : parseFloat(value);
        var range = e('input', {
            type: 'range',
            name: name,
            min: min,
            max: max == null ? 100 : max ,
            step: step == null ? 1 : step,
            value: value
        });
        range.addEventListener('change', function(evt) {
            updateValue(name, parseFloat(evt.target.value));
        });
        return [wrapInput(e('div', {}, [range]), name, description, 'range'), value];
    },
    checkbox: function(name, description, value) {
        value = (value == 'false') ? false : !!value;
        var checkbox = e('input', {
            type: 'checkbox',
            checked: value
        });
        checkbox.addEventListener('change', function(evt) {
            updateValue(name, evt.target.checked);
        });
        return [wrapInput(checkbox, name, description, 'checkbox'), value];
    },
    button: function(text, fn) {
        var btn = e('button', {
            textContent: text
        });
        btn.addEventListener('click', fn);
        return [btn];
    },
    html: function(html) {
        return [e('div', {
            innerHTML: html
        })];
    }
};

function wrapInput(input, name, description, type) {
    return e('div', {
        className: 'optionificator-' + type + ' optionificator-' + type + '-' + name
    }, [
        e('label', {}, [
            e('span', {
                textContent: description + ': '
            }),
            input
        ])
    ]);
}

var values = {};
var listeners = [];

function updateValue(name, value) {
    var oldValue = values[name];
    values[name] = value;
    listeners.forEach(function(listener) {
        listener(values, name, value, oldValue);
    });
}

module.exports.optionificate = function(options, settings) {
    values = {};

    var element = e('div', {
        className: 'optionificator'
    }, options.map(function(option) {
        var result = elementTypes[option[0]].apply(null, option.slice(1));
        if (result[1] !== undefined) {
            values[option[1]] = result[1];
        }
        return result[0];
    }));

    if (settings && settings.parseURL) {
        window.location.hash.replace(/^#/, '').split(';').forEach(function(ps, p) {
            var parts = p.split(':');
            values[parts[0]] = parts[1];
        });
    }

    return element;
};

module.exports.getValues = function() {
    return values;
};

module.exports.listen = function(listener) {
    listeners.push(listener);
};
