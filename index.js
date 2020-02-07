// TODO: add rule for `.restore` being called on methods, suggest it gets called on sinon or sandbox only

module.exports = {
  rules: {
    'stubbing-in-nested-before-each': require('./rules/stubbingInNestedBeforeEach'),
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
