const { Event } = require('../models');
const Comment = require('../models/comment');
const Media = require('../models/media');
const User = require('../models/user');

exports.getAll = async (req, res) => {
  const events = await Event.findAll({  });
  // Afficher les commentaires uniquement pour les utilisateurs connectés
  if (req.user) {
    events.forEach(event => {
      event.comments = event.comments.filter(comment => comment.status === 'approved');
    });
  }
  res.json(events);
};

exports.getById = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  event ? res.json(event) : res.status(404).json({ message: 'Not found' });
};

exports.create = async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json(newEvent);
};

exports.update = async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  await event.update(req.body);
  res.json(event);
};

exports.delete = async (req, res) => {
  const deleted = await Event.destroy({ where: { id: req.params.id } });
  res.json({ deleted });
};

// Moderate comment

exports.moderateComment = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Not found' });

    event.status = status;
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
}

// Get all comments for an event within admin role
exports.getAllComments = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id, {
      include: [{ model: Comment, as: 'comments' }]
    });

    if (!event) return res.status(404).json({ message: 'Not found' });

    res.json(event.comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
}

// Get all comments for an event within user role
exports.getUserComments = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id, {
      include: [{ model: Comment, as: 'comments' }]
    });

    if (!event) return res.status(404).json({ message: 'Not found' });

    res.json(event.comments.filter(comment => comment.userId === req.user.id));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
}

// Link comment to event
exports.linkCommentToEvent = async (req, res) => {
  const { eventId, commentId } = req.params;

  try {
    const event = await Event.findByPk(eventId);
    const comment = await Comment.findByPk(commentId);

    if (!event || !comment) return res.status(404).json({ message: 'Not found' });

    await event.addComment(comment);

    res.json({ message: 'Comment linked to event successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error linking comment to event', error });
  }
}

exports.getMediasByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId, {
      include: [{ model: Media, as: 'media' }]
    });

    if (!event) return res.status(404).json({ message: 'Not found' });

    res.json(event.media);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media', error });
  }
};

// get all favorites events
exports.getAllFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Event, as: 'favorites' }],
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

exports.addFavorite = async (req, res) => {
  const { id } = req.params;
  // const userId = req.user.id; // ID de l'utilisateur connecté

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // await event.addUser(userId);

    res.json({ message: 'Event added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding event to favorites', error });
  }
};

exports.removeFavorite = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.removeUser(userId);

    res.json({ message: 'Event removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing event from favorites', error });
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const favorites = await Event.findAll({
      include: [
        {
          model: User,
          as: 'users_favorited',
          where: { id: userId },
        },
      ],
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error });
  }
};

// Ajouter un commentaire à un événement
exports.addComment = async (req, res) => {
  const { id } = req.params; // ID de l'événement
  const { content } = req.body; // Contenu du commentaire
  const userId = req.user.id; // ID de l'utilisateur connecté

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const comment = await Comment.create({
      content,
      user_id: userId,
      event_id: id,
      isApproved: false, // Par défaut, le commentaire n'est pas approuvé
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};