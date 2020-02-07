module.exports = {
  create: (context) => ({
    'Identifier[name="stub"]' (node) {
      const ancestors = context.getAncestors()
      const contextOrDescribeAncestorNodes = ancestors.filter(contextOrDescribeAncestors)
      const argsCount = getStubCallArguments(node)

      // Ignore when sinon.stub() is being called to assign a stub as the method in an object
      if (argsCount === 0) {
        return
      }

      // Stubs should appear only in the top-most beforeEach call
      if (contextOrDescribeAncestorNodes.length > 1) {
        context.report(node, 'stub dependencies only in the top-most beforeEach block (in top-most describe)')
      }
    }
  })
}

const contextOrDescribeAncestors = ancestor => {
  return Boolean(
    ancestor.type === 'CallExpression' &&
    ancestor.callee.type === 'Identifier' &&
    ['context', 'describe'].includes(ancestor.callee.name)
  )
}

const getStubCallArguments = (node) => {
  if (node.parent.type === 'MemberExpression' && ['sinon', 'sandbox'].includes(node.parent.object.name)) {
    if (node.parent.parent.type === 'CallExpression') {
      if (node.parent.parent && node.parent.parent.arguments) {
        return node.parent.parent.arguments.length
      }
    }
  }

  return 0
}
