const User = require('./user');
const Event = require('./events');
const Comment = require('./comment');
const Favorite = require('./favorite');
const Media = require('./media');
const Period = require('./period');

// / Table pivot Favorite créée automatiquement par Sequelize
User.belongsToMany(Event, { as: 'favorites', through: 'Favorite', foreignKey: 'user_id' });
Event.belongsToMany(User, { as: 'users_favorited', through: 'Favorite', foreignKey: 'event_id' });

module.exports = {
    User,
    Period,
    Event,
    Media,
    Comment,
    Favorite,
};