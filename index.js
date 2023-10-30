const state = {
    count: 1,
    name: 'stateFunction',
    visible: false
}

/**
 *
 * @param value {Function | Object}
 * @return {Function | Object}
 */
function _validateStateFunctionParameters(value) {
    if (typeof value === 'function') {
        return value(state);
    } else if (typeof value === 'object') {
        return value;
    } else {
        throw new Error('Invalid type of params');
    }
}

/**
 *
 * @param args {Function | Object}
 * @return {void}
 */
function setState(args) {
    const params = _validateStateFunctionParameters(args);
    for (const [key] of Object.entries(state)) {
        if (typeof params[key] === 'undefined') continue;
        state[key] = params[key];
    }
}

// Experiments

setState((state) => ({
    count: state.count += 333,
    name: state.name + '__'
}));

setState((state) => {
    return {count: state.count += 100, name: 'set'}
});

setState({count: 100});

console.log(state)