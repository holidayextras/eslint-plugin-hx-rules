module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow usage of sinon.restore in nested beforeEach blocks',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/holidayextras/eslint-plugin-hx-rules/docs/rules/prefer-single-sinon-restore.md'
    }
  },
  create: (context) => ({
    'Identifier[name="restore"]' (node) {
      if (node.parent.type === 'MemberExpression') {
        if (node.parent.object.name !== 'sinon' || node.parent.property.name !== 'restore') {
          context.report(node, 'prefer using a signle sinon.restore() in the top-most afterEach block')
        }
      }
    }
  })
}
