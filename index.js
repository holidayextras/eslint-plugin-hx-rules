module.exports = {
  rules: {
    'before-each': {
      create: (context) => ({
        'Identifier[name="beforeEach"]' (node) {
          const ancestors = context.getAncestors()
          const count = ancestors.reduce((acc, a) => {
            if (
              a.type === 'CallExpression' &&
              a.callee.type === 'Identifier' &&
              ['context', 'describe'].includes(a.callee.name)
            ) {
              return acc + 1
            }

            return acc
          }, 0)

          if (count > 1) {
            context.report(node, 'test has nested beforeEach')
          }
        }
      })
    },
    'no-template-literals': {
      create: (context) => ({
        TemplateLiteral (node) {
          context.report(node, 'Do not use template literals!!!!!!1')
        }
      })
    },
    'async-func-name': {
      create: (context) => ({
        FunctionDeclaration (node) {
          if (node.async && !/Async$/.test(node.id.name)) {
            context.report({
              node,
              message: "Async function name '{{ funcname }}' must end with 'Async'!!!!!!! (number of params {{params}})",
              data: {
                funcname: node.id.name,
                params: node.params.length
              }
            })
          }
        }
      })
    }
  }
}
