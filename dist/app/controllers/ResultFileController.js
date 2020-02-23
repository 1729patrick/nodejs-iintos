"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ResultFile = require('../models/ResultFile'); var _ResultFile2 = _interopRequireDefault(_ResultFile);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
/**
 * Controller for the all files of an result
 */
class ResultFileController {
	/**
	 * Get, Returns all the files from a result given it's id by the params
	 * @param {*} req
	 * @param {*} res
	 */
	async index(req, res) {
		const resultId = req.params.id;

		const files = await _ResultFile2.default.findAll({
			where: { resultId },
			attributes: ['id', 'resultId', 'fileId'],
			include: [
				{
					model: _File2.default,
					as: 'file',
					attributes: ['name', 'path', 'url'],
				},
			],
		});
		res.json(files);
	}
	/**
	 *
	 * @param {*} req
	 * @param {*} res
	 */
	async create(req, res) {
		const { originalname: name, filename: path } = req.file;
		const file = await _File2.default.create({ name, path });

		return res.json(file);
	}
}

exports. default = new ResultFileController();
