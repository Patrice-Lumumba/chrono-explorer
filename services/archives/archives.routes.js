const express = require('express');
const router = express.Router();
const archivesController = require('./archives.controller');

router.get('/', archivesController.getAllArchives);

module.exports = router;
// Compare this snippet from services/archives/archives.controller.js:
// const Archive = require('./archives.model');
//
// exports.createArchive = async (req, res) => {
//   try {
//     const archive = await Archive.create(req.body);
//     res.status(201).json(archive);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };