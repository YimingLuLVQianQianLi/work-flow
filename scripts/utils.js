const path = require('path');

const fs = require('fs');

const shell = require('shelljs');

const getPath = (_path) => path.resolve(__dirname, '../', _path);

const getPackageInfo = () => require(getPath('./package.json'))

const getBaseInfo = (packageInfo) => {
    const fileContent = `# ${packageInfo.name}-V${packageInfo.version} \n\n> 项目描述：${packageInfo.description} \n\n`   
    return fileContent
}

function getPublishConfig() {
    return {
        resolve: './dist', 
        filename: 'README.md', 
    }
}

function writeProjectInfoFile(config, package) {
    fs.writeFileSync(`${getPath(config.resolve + '/' + config.filename)}`, getBaseInfo(package), 'utf-8')
}

function echoError(code, msg){
    if(code !== 0){
        shell.echo(`Error: ${msg}`);
        shell.exit(1);
    }
}

function changeVersion(type){
    const change = shell.exec(`npm version ${type}`).code;
    echoError(change, `npm version ${type} failed`);
}

function pushTag(version, content){
    // 根据版本创建tag
    const create = shell.exec(`git tag -a ${version} -m ${content} `).code;
    echoError(create, `create tag ${version} failed`);
    // 提交tag
    const push = shell.exec(`git push origin ${version}`).code;
    echoError(push, `push tag ${version} failed`);
}

function deletTag(version){
    // 删除对应tag
    const _delete = shell.exec(`git tag -d ${version}`).code;
    echoError(_delete, `delete tag ${version} failed`);
    // 提交删除tag
    const push = shell.exec(`git push origin :refs/tags/${version}`).code;
    echoError(push, `push tag ${version} failed`);
}



exports.getPath = getPath;
exports.getPublishConfig = getPublishConfig;
exports.getPackageInfo = getPackageInfo;
exports.writeProjectInfoFile = writeProjectInfoFile;
exports.echoError = echoError;
exports.pushTag = pushTag;
exports.deletTag = deletTag;
exports.changeVersion = changeVersion;