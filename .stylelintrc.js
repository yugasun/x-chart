module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier',
        'stylelint-config-standard-scss',
    ],
    customSyntax: 'postcss-scss',
    rules: {
        indentation: 4,
        'string-quotes': 'single',
        'scss/dollar-variable-pattern': null,
    },
};
