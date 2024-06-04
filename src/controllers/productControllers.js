import Product from "../models/products.js";
import productValidation from "../validation/productValidation.js";

// Fonction pour obtenir tous les produits
export const getAll = (req, res) => {
    Product.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: `Erreur du serveur: ${err}` });
        });
};

// Fonction pour obtenir un produit par son ID
export const getOne = (req, res) => {
    const { id } = req.params;
    Product.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
    })
        .then((data) =>
            data
                ? res.status(200).json(data)
                : res.status(404).json("Product not found")
        )
        .catch((err) =>
            res.status(500).json({ message: `Erreur du serveur: ${err}` })
        );
};

// Fonction pour enregistrer un nouveau produit
export const createOne = (req, res) => {
    const { body } = req;
    const { error } = productValidation(body);

    if (error) return res.status(400).json(error.details[0].message);

    Product.create({ ...body })
        .then((data) => {
            console.log(data);
            res.status(201).json({
                message: `Le produit "${data.dataValues.title}" a été creer avec success`,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: `Erreur de la part du serveur ${err}`,
            });
        });
};

// Fonction pour mettre à jour un produit par son ID
export const updateOne = (req, res) => {
    const { id } = req.params;
    const { body } = req;

    Product.findByPk(id).then((product) => {
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        product.title = body.title;
        product.price = body.price;
        product.description = body.description;
        product
            .save()
            .then((data) => {
                res.status(200).json({ message: "Product has been updated" });
            })
            .catch((error) => {
                res.status(304).json({
                    message: "Product not modified because: ",
                    error,
                });
            });
    });
};
export const deleteOne = (req, res) => {};
