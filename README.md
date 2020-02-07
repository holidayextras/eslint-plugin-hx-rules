# eslint-plugin-hx-rules
ESLint plugin for adding rules for best coding practices agreed at Holiday Extras

This is a playground project and its development is in progress.

### Setting up locally

1. Clone this repo locally:
```
git clone git@github.com:holidayextras/eslint-plugin-hx-rules.git
```

2. Link the locally cloned plugin into your project (this way you'll be able to modify the plugin and test it locally):
```
cd my-project
npm link ../eslint-plugin-hx-rules
```

3. Enable the plugin and set up the rules you want to use in your `.eslintrc` file:
```json
{
    "plugins": [
        "hx-rules"
    ],
    "rules": {
      "hx-rules/no-template-literals": "error",
      "hx-rules/async-func-name": "warn"
    }
}
```

### Rules

* [No stubbing in nested before each](#no-stubbing-in-nested-before-each)

##### No stubbing in nested before each

This rule enforces stubbing dependencies in the top most beforeEach block. This way is a lot easier for anyone updating/maintaining the test to see which dependencies are getting stubbed at the top of the file.
There is one exception. Any calls to `sinon.stub()` are ignored as you might be assigning a stub to an object which is yielded from a another stub.

*Bad*

```javascript
const dep = require('./dep')

describe('module name', () => {
  describe('methodOne', () => {
    beforeEach(() => {
      sinon.stub(dep, 'method').yields(null, 'foo')
    })
    
    it('should ..', () => {
      // testing methodOne
    })
  })

  describe('methodTwo', () => {
    beforeEach(() => {
      sinon.stub(dep, 'method').yields(null, 'bar')
    })
    
    it('should ..', () => {
      // testing methodTwo
    })
  })
})
```

*Good*

```javascript
const dep = require('./dep')

describe('module name', () => {
  beforeEach(() => {
    sinon.stub(dep, 'method')
  })

  describe('methodOne', () => {
    beforeEach(() => {
      dep.method.yields(null, 'foo')
    })
    
    it('should ..', () => {
      // testing methodOne
    })
  })

  describe('methodTwo', () => {
    beforeEach(() => {
      dep.method.yields(null, 'bar')
    })
    
    it('should ..', () => {
      // testing methodTwo
    })
  })
})
```
