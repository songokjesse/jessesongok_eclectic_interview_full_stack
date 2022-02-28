const db = require("../models");
const Loan = db.loan;
const { Op } = require("sequelize");

// Create and Save a new Loan
const create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: " Loan name is required: Name can not be empty!"
        });
        return;
    }
    // Create a Loan
    const Loan = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    // Save Loan in the database
    Loan.create(Loan)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Loan."
            });
        });
};
// Retrieve all Loan from the database.
const findAll = (req, res) => {
    Loan.findAll()
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
// Find a single Loan with an id
const findOne = (req, res) => {
    const id = req.params.id;
    Loan.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Loan with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Loan with id=" + id
            });
        });
};
// Update a Loan by the id in the request
const update = (req, res) => {
    const id = req.params.id;
    Loan.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Loan was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Loan with id=${id}. Maybe Loan was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Loan with id=" + id
            });
        });
};
// Delete a Loan with the specified id in the request
const deleteItem = (req, res) => {
    const id = req.params.id;
    Loan.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Loan was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Loan with id=${id}. Maybe Loan was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Loan with id=" + id
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