
'use strict';

module.exports = {

  types: [
    { value: '新增', name: '新增:    新增一个功能' },
    { value: '修复', name: '修复:    修复一个Bug' },
    { value: '文档', name: '文档:    变更的只有文档' },
    { value: '格式', name: '格式:    代码空格, 分号等格式修复' },
    { value: '重构', name: '重构:    代码重构，注意和特性、修复区分开' },
    { value: '性能', name: '性能:    提升性能' },
    { value: '测试', name: '测试:    添加一个测试' },
    { value: '构建', name: '构建:    变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等）' },
    { value: '集成', name: '集成:    更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等' },
    { value: '工具', name: '工具:    变更构建流程或辅助工具(构建、脚手架工具等)' },
    { value: '回滚', name: '回滚:    代码回退' }
  ],

  scopes: [
    { name: '*' },
    { name: 'src' },
    { name: 'views' },
    { name: 'components' },
    { name: 'template' }
  ],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择本次提交影响的范围(可选):',
    // used if allowCustomScopes is true
    customScope: '说明此更改的范围：',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选 按 enter 跳过)：\n',
    breaking: '非兼容性说明 (可选 按 enter 跳过):\n',
    // footer: '列出此次改动解决的所有 issues （如："#123, #234"）(可选 按 enter 跳过)：\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: [],

  // limit subject length
  subjectLimit: 100

}