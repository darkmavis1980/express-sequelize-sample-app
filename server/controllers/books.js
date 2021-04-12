const db = require('../_models');

const Books = db.books;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const {
    title,
    description,
    published = false,
  } = req.body;
  // Validate request
  if (!title) {
    return res.status(400).send({
      message: 'You must pass a title at least!'
    });
  }

  // Create a book
  const book = {
    title,
    description,
    published
  };
  try {
    const data = await Books.create(book);
    return res.json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

exports.findAll = async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  try {
    const data = await Books.findAll({ where: condition });
    return res.json(data);
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred while retrieving books.'
    });
  }
}

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Books.findByPk(id)
    return res.json(data);
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred while retrieving books.'
    });
  }
}

exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, description, published } = req.body;

  try {
    const num = await Books.update({
      title,
      description,
      published,
    },
    {
      where: {
        id
      }
    });
    if (num == 1) {
      return res.send({
        message: 'Book updated successfully'
      })
    }
    return res.status(400).send({
      message: `Something went wrong, cannot update the book id ${id}`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message || `Some error occurred while updating the book (id=${id}).`
    });
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Books.destroy({
      where: {
        id
      }
    });
    if (num == 1) {
      return res.send({
        message: 'Book deleted successfully'
      })
    }
    return res.status(400).send({
      message: `Something went wrong, cannot delete the book id ${id}`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message || `Some error occurred while deleting the book (id=${id}).`
    });
  }
}