module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow usage of flag function parameters',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/holidayextras/eslint-plugin-hx-rules/docs/rules/no-flag-function-parameters'
    },
    schema: []
  },
  create: (context) => ({
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
