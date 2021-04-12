const db = require('../_models');

const Authors = db.authors;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const {
    firstname,
    lastname,
  } = req.body;
  // Validate request
  if (!firstname || !lastname) {
    return res.status(400).send({
      message: 'You must pass a firstname and lastname!'
    });
  }

  // Create a book
  const author = {
    firstname,
    lastname,
  };
  try {
    const data = await Authors.create(author);
    return res.json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

exports.findAll = async (req, res) => {
  const lastname = req.query.lastname;
  const condition = lastname ? { lastname: { [Op.like]: `%${lastname}%` } } : null;

  try {
    const data = await Authors.findAll({ where: condition });
    return res.json(data);
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred while retrieving authors.'
    });
  }
}

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Authors.findByPk(id)
    return res.json(data);
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred while retrieving authors.'
    });
  }
}

exports.update = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;

  try {
    const num = await Authors.update({
      firstname,
      lastname
    },
    {
      where: {
        id
      }
    });
    if (num == 1) {
      return res.send({
        message: 'Author updated successfully'
      })
    }
    return res.status(400).send({
      message: `Something went wrong, cannot update the author id ${id}`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message || `Some error occurred while updating the author (id=${id}).`
    });
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Authors.destroy({
      where: {
        id
      }
    });
    if (num == 1) {
      return res.send({
        message: 'Author deleted successfully'
      })
    }
    return res.status(400).send({
      message: `Something went wrong, cannot delete the author id ${id}`
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message || `Some error occurred while deleting the author (id=${id}).`
    });
  }
}