class BaseComponent {
    state = {};

    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error(`${this} is an Abstract class and can not be instantiated! `)
        }
    }

    /**
     *
     * @param value {Function | Object}
     * @return {Function | Object}
     */
    #validateStateFunctionParameters(value) {
        if (typeof value === 'function') {
            return value(this.state);
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
    setState(args) {
        const params = this.#validateStateFunctionParameters(args);
        for (const [key] of Object.entries(this.state)) {
            if (typeof params[key] === 'undefined') continue;
            this.state[key] = params[key];
        }
    }

}

const ToggleComponentMixin = (SuperClass) =>

    class extends SuperClass {
        toggle() {
            console.log('toggle')
        }
    };


class HyperComponent extends ToggleComponentMixin(BaseComponent) {
    state = {
        color: 'red'
    }
}

const hyperComponent = new HyperComponent();
hyperComponent.setState({color: 'blue'});
hyperComponent.toggle();
console.log(hyperComponent.state);