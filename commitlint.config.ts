export default {
    extends: ['@commitlint/config-conventional', 'cz'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feature',
                'feat',
                'bug',
                'fix',
                'ui',
                'docs',
                'style',
                'perf',
                'release',
                'deploy',
                'refactor',
                'test',
                'chore',
                'revert',
                'merge',
                'build',
            ],
        ],
        // <type> low case
        'type-case': [2, 'always', 'lower-case'],
        // <type> cannot empty
        'type-empty': [2, 'never'],
        // <scope> cannot empty
        'scope-empty': [0, 'never'],
        // <scope> scope
        'scope-case': [0],
        // <subject> message commot empty
        'subject-empty': [2, 'never'],
        // <subject> disable stop char
        'subject-full-stop': [0, 'never'],
        // <subject> disable subject case
        'subject-case': [0, 'never'],
        // <body> start with blank
        'body-leading-blank': [1, 'always'],
        'header-max-length': [0, 'always', 72],
    },
};
