/**
 * 发布时使用的文件
 */
const shell = require('shelljs');

const inquirer = require('inquirer');

const { getPublishConfig, writeProjectInfoFile, getPackageInfo, pushTag, deletTag, changeVersion } = require('./utils.js');

const config = getPublishConfig();

// 判断本地git环境
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

const promptList = [
    /**
     * 当为 Y 时，更新当前版本，并新增一个tag
     * 当为 N 时，删除当前版本对应的tag，重新打tag
     */
    {
        type: "confirm",
        message: "是否升级版本号?",
        name: "update",
        suffix: " y - 升级当前版本号；n - 继续使用当前版本号"
    },
    {
        type: 'list',
        message: '请选择升级的版本类型',
        name: 'type',
        choices: [
            {
                name: '变更主版本号',
                value: 'major',

            },
            {
                name: '变更次版本号',
                value: 'minor'
            },
            {
                name: '变更补丁号',
                value: 'patch'
            }
        ],
        default: 'patch',
        when: function (answers) { // 当watch为true的时候才会提问当前问题
            return answers.update
        }
    },
    {
        type: 'input',
        message: '输入本次版本的描述:',
        name: 'content',
        default: "" // 默认值
    }
]
inquirer.prompt(promptList).then(answers => {
    // 需要变更版本的时候，先变更版本
    if (answers.update) changeVersion(answers.type);
    // 获取此时的版本
    const packageJson = getPackageInfo();
    const { version } = packageJson
    if (!answers.update) {
        // 先删除tag
        const hasTag = shell.exec(`git show ${version}`, { silent: true }).code
        if (hasTag === 0) {
            console.log('此时这个tag已经存在')
            deletTag(version)
        }
    }
    // 推送tag
    pushTag(version, answers.content || version)
    // 写入文件
    writeProjectInfoFile(config, packageJson)
});