# Optionificator

Create a set of HTML inputs for manipulating a set of options.

Supported inputs are slider, checkbox, text, button, and you can also add unfiltered html if you want.

## Installation

```
$ npm install optionificator
```

Or just download the script and drop it in your html.

## Usage

```javascript
var optionificator = require('optionificator');

var o = optionificator.optionificate([
    ['slider', 'slider1', 'Change a value', 50, 20, 80, 5],
    ['slider', 'slider2', 'Change another value'],
    ['checkbox', 'check1', 'I am checkbox', true],
    ['checkbox', 'check2', 'I am another checkbox', 'false'],
    ['text', 'text1', 'Type something'],
    ['button', 'Click me', function() { alert('Thank you for clicking'); }],
    ['html', '<strong>I am html</strong>']
]);

document.body.appendChild(o);

optionificator.listen(console.log.bind(console));
```

## License

MIT
