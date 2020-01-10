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
