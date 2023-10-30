class BaseComponent {
    state = {};

    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error(`${this} is an Abstract class and can not be instantiated! `)
        }
    }

    test() {
        console.log('test() method');
    }

}

const ToggleComponentMixin = (superclass) => class extends superclass {
    toggle() {
        console.log('ToggleComponentMixin:::toggle()');
    }
}

const DropdownComponentMixin = (superclass) => class extends superclass {
    open() {
        console.log('DropdownComponentMixin:::open()');
    }
}

class MixinBuilder {
    constructor(superclass) {
        this.superclass = superclass;
    }

    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}

const mix = (superclass) => new MixinBuilder(superclass);

class SuperComponent extends mix(BaseComponent).with(ToggleComponentMixin, DropdownComponentMixin) {
    state = {
        name: 'inhalt'
    }
}

const superComponent = new SuperComponent();
superComponent.open();
console.log(superComponent)