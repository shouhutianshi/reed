const download = require('download-git-repo');
const request = require('./request');
const { orgName, tplName } = require('../../config');

class Git {
	constructor() {
		this.orgName = orgName;
		this.tplName = tplName;
	}

	/**
	 * 获取项目模板的版本列表
	 * @param {String} repo 项目名称
	 */
	getProjectTpl(repo) {
		return request(`/repos/${this.orgName}/${this.tplName}`);
	}

	/**
	 * 下载 github 项目
	 * @param {Object} param 项目信息 项目名称 项目版本 本地开发目录
	 */
	downloadProject({ repoPath }) {
		return new Promise((resolve, reject) => {
			download(`${this.orgName}/${this.tplName}`, repoPath, err => {
				if (err) reject(err);
				resolve(true);
			});
		});
	}
}

module.exports = Git;
