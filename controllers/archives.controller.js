const Archive = require('../models');

exports.createArchive = async (req, res) => {
  try {
    const archive = await Archive.create(req.body);
    res.status(201).json(archive);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getAllArchives = async (req, res) => {
    try {
        const archives = await Archive.findAll();
        res.status(200).json(archives);
    } catch (error) {
        res.status(400).json({ error: error.message });
   }
};