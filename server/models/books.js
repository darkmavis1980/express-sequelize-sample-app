

module.exports = (sequelize, Sequelize) => {

  const Book = sequelize.define('book', {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    author_id: {
      type: Sequelize.INTEGER
    }
  });

  Book.associate = (models) => {
    Book.hasMany(models.Author, {
      foreignKey: 'author_id',
      as: 'authors'
    })
  }

  return Book;
};