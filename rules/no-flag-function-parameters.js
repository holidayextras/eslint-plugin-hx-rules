module.exports = {
  create: (context) => ({
    // 'IfStatement > LogicalExpression > Identifier': (node) => {
    'IfStatement Identifier': (node) => {
      const functionDeclaration = context.getAncestors().find(a => a.type === 'FunctionDeclaration')
      if (functionDeclaration && functionDeclaration.params.map(p => p.name).includes(node.name)) {
        context.report({
          node,
          message: 'Don\'t use flags as function parameters'
        })
      }
    }
  })
}
