const action = require('./action');

test('walk', () => {
    expect(action.walk()).toBe('walk');
});

test('run', () => {
    expect(action.run()).toBe('run');
});

test('fly', () => {
    expect(action.fly()).toBe('fly');
});
