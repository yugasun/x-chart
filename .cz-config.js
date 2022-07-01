module.exports = {
    types: [
        { value: 'feat', name: 'feat:      New Feature' },
        { value: 'bug', name: 'bug:      Should With Bug Number' },
        { value: 'fix', name: 'fix:      Fix bug' },
        { value: 'ui', name: 'ui:       Update UI' },
        { value: 'docs', name: 'docs:     Modify documents' },
        {
            value: 'style',
            name: 'style:    Update code style(do not influence business code)',
        },
        { value: 'perf', name: 'perf:     Performance' },
        {
            value: 'refactor',
            name: 'refactor: Refact neither feature or bug fix',
        },
        { value: 'release', name: 'release:  Release' },
        { value: 'deploy', name: 'deploy:   Deployment' },
        { value: 'test', name: 'test:     Add test case' },
        {
            value: 'chore',
            name: 'chore:    Update build process or project tools(do not influence business code)',
        },
        { value: 'revert', name: 'revert:   Revert' },
        { value: 'build', name: 'build:    Build' },
    ],
    // override the messages, defaults are as follows
    messages: {
        type: 'Please choose commit type:',
        customScope: 'Please input modify scope (optional):',
        subject: 'Please describe your commit message (required):',
        body: 'Please input decription in detail(optional):',
        footer: 'Please input issue to be closed(optional):',
        confirmCommit: 'Confirm to submit?(y/n/e/h)',
    },
    allowCustomScopes: true,
    skipQuestions: ['body', 'footer'],
    subjectLimit: 72,
};
