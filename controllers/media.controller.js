const { Media } = require('../models');
const path = require('path');

// Utilitaires à créer ou adapter selon ton projet
// const { ValidationError } = require('../utils/errorHandler');
// const { getMediaTypeFromMimetype, validateAndParseIntId } = require('../utils/validation');

exports.getAll = async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.event_id) filters.event_id = req.query.event_id;

    const media = await Media.findAll({ where: filters });
    res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des médias', error });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Media.findByPk(req.params.id);
    item
      ? res.status(200).json({ success: true, data: item })
      : res.status(404).json({ message: 'Not found' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du média', error });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.event_id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    let mediaData = {
      ...req.body,
      uploader_id: req.user ? req.user.id : null
    };

    // Si upload de fichier
    if (req.file) {
      const relativePath = path.relative(process.cwd(), req.file.path).replace(/\\/g, '/');
      mediaData = {
        ...mediaData,
        type: req.file.mimetype, // Remplace par getMediaTypeFromMimetype(req.file.mimetype) si tu as la fonction
        url: relativePath,
      };
    }
    // Si URL externe
    else if (req.body.url) {
      if (!req.body.type) {
        return res.status(400).json({ message: 'Media type is required for external URLs' });
      }
      mediaData = {
        ...mediaData,
        type: req.body.type,
        url: req.body.url
      };
    } else {
      return res.status(400).json({ message: 'Either a file or URL must be provided' });
    }

    const newItem = await Media.create(mediaData);
    res.status(201).json({ success: true, message: 'Media created successfully', data: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du média', error });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Media.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    // Empêcher la modification de certains champs critiques
    const protectedFields = ['id', 'url', 'type', 'filename', 'mimetype', 'size', 'uploader_id'];
    const mediaData = { ...req.body };
    protectedFields.forEach(field => { if (mediaData[field]) delete mediaData[field]; });

    await item.update(mediaData);
    res.status(200).json({ success: true, message: 'Media updated successfully', data: item });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du média', error });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Media.destroy({ where: { id: req.params.id } });
    res.status(200).json({ success: true, message: 'Media deleted successfully', data: { deleted } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du média', error });
  }
};

// Récupérer les médias d'un événement
exports.getMediaByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const media = await Media.findAll({ where: { event_id: eventId } });
    res.status(200).json({ success: true, count: media.length, data: media });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des médias de l\'événement', error });
  }
};