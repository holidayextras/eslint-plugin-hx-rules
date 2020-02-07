# Prefer single sinon restore

This rule enforces using a single `sinon.restore()` instead of calling `.restore()` on each stub throughout the test.

*Bad*

```javascript
const dep = require('./dep')

describe('module name', () => {
  beforeEach(() => {
    sinon.stub(dep, 'method')
  })

  describe('methodOne', () => {
    afterEach(() => {
      dep.method.restore()
    })

    it('should ..', () => {
      // testing methodOne
    })
  })

  describe('methodTwo', () => {
    afterEach(() => {
      dep.method.restore()
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

  afterEach(() => {
    sinon.restore()
  })

  describe('methodOne', () => {
    it('should ..', () => {
      // testing methodOne
    })
  })

  describe('methodTwo', () => {
    it('should ..', () => {
      // testing methodTwo
    })
  })
})
```
