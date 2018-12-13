module.exports = {
    root: true,
    env: {
        node: true,
        mocha: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    "plugins": [
        "chai-friendly"
    ],
    rules: {
        "no-unused-expressions": 0,
        "chai-friendly/no-unused-expressions": 2,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': [
            'error',
            4
        ],
        // 'linebreak-style': [
        //   'error'
        // ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        "vue/html-indent": [
            "error",
            4
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
