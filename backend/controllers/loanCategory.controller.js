const db = require("../models");
const LoanCategory = db.loancategory;
const { Op } = require("sequelize");

// Create and Save a new LoanCategory
const create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: " LoanCategory name is required: Name can not be empty!"
        });
        return;
    }
    // Create a LoanCategory
    const LoanCategory = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    // Save LoanCategory in the database
    LoanCategory.create(LoanCategory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the LoanCategory."
            });
        });
};
// Retrieve all LoanCategory from the database.
const findAll = (req, res) => {
    LoanCategory.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the Loan categories."
            });
        });
};
// Find a single LoanCategory with an id
const findOne = (req, res) => {
    const id = req.params.id;
    LoanCategory.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find LoanCategory with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving LoanCategory with id=" + id
            });
        });
};
// Update a LoanCategory by the id in the request
const update = (req, res) => {
    const id = req.params.id;
    LoanCategory.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "LoanCategory was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update LoanCategory with id=${id}. Maybe LoanCategory was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating LoanCategory with id=" + id
            });
        });
};
// Delete a LoanCategory with the specified id in the request
const deleteItem = (req, res) => {
    const id = req.params.id;
    LoanCategory.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "LoanCategory was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete LoanCategory with id=${id}. Maybe LoanCategory was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete LoanCategory with id=" + id
            });
        });
};

module.exports ={
    create,
    findOne,
    findAll,
    update,
    deleteItem
}