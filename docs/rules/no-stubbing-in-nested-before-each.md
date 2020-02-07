# No stubbing in nested before each

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
