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
