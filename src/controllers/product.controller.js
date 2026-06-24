import mongoose from "mongoose";
import productModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, category, price } = req.body;

        if (!name || !category || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const product = await productModel.create({
            name,
            category,
            price
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const { limit = "20", cursor } = req.query;
        const parsedLimit = Number.parseInt(limit, 10);

        if (Number.isNaN(parsedLimit) || parsedLimit <= 0) {
            return res.status(400).json({
                success: false,
                message: "The limit query parameter must be a positive integer"
            });
        }

        const pageSize = Math.min(parsedLimit, 100);
        const filter = {};

        if (cursor) {
            if (!mongoose.Types.ObjectId.isValid(cursor)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cursor format"
                });
            }

            filter._id = { $gt:new mongoose.Types.ObjectId(cursor) };
        }

        const products = await productModel
            .find(filter)
            .sort({ _id: 1 })
            .limit(pageSize + 1)
            .lean();

        const hasNextPage = products.length > pageSize;
        const data = hasNextPage ? products.slice(0, pageSize) : products;
        const nextCursor = hasNextPage ? String(data[data.length - 1]._id) : null;

        res.status(200).json({
            data,
            nextCursor,
            hasNextPage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};