// 命令管理
const commander = require('commander');
// 命令行交互工具
const inquirer = require('inquirer');
// 命令行中显示加载中
const ora = require('ora');
const Git = require('../tools/git');

class Download {
	constructor() {
		this.git = new Git();
		this.commander = commander;
		this.inquirer = inquirer;
		this.getTpl = ora('获取项目模板...');
		this.downLoad = ora('正在加速为您下载代码...');
	}

	run() {
		this.commander
			.command('download')
			.description('从远程下载代码到本地...')
			.action(() => {
				this.download();
			});

		this.commander.parse(process.argv);
	}

	async download() {
		let getTplLoad;
		let downLoadLoad;
		let name;

		// 获取项目的版本, 这里默认选择确定项目的最近一个版本
		try {
			getTplLoad = this.getTpl.start();
			name = await this.git.getProjectTpl();
			getTplLoad.succeed('获取项目模板成功！');
		} catch (error) {
			console.log(error);
			getTplLoad.fail('获取项目版本失败...');
			process.exit(-1);
		}

		// 向用户咨询欲创建项目的目录
		const repoName = [
			{
				type: 'input',
				name: 'repoPath',
				message: '请输入项目名称：',
				validate: function(input) {
          return !input.trim() ? "项目名称不能为空！" : true;
				},
			},
		];
		const { repoPath } = await this.inquirer.prompt(repoName);

		// 下载代码到指定的目录下
		try {
			downLoadLoad = this.downLoad.start();
			await this.git.downloadProject({ repoPath });
			this.downLoad.succeed('下载代码成功！');
		} catch (error) {
			console.log(error);
			downLoadLoad.fail('下载代码失败...');
		}
	}
}
const D = new Download();
D.run();
