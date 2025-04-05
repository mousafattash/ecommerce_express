import slugify from "slugify";
import cloudinary from "../../utils/cloudinary";

import Product from '../../../DB/models/product.model.js';


export const createProduct = async (req, res) => {
    // try {
    //     const { name, description, price, category, stock } = req.body;
    //     const createdBy = req.user._id;

    //     // Validate the input
    //     if (!name || !description || !price || !category || !stock) {
    //         return res.status(400).json({ message: 'All fields are required' });
    //     }

    //     // Create a new product
    //     const newProduct = new Product({
    //         name,
    //         description,
    //         price,
    //         category,
    //         stock,
    //         createdBy
    //     });

    //     await newProduct.save();

    //     return res.status(201).json({ message: 'Product created successfully', product: newProduct });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }

    const { name, price, catagoryId ,discount} = req.body;
    const checkCatagory = await Category.findById(catagoryId);
    if (!checkCatagory) {
        return res.status(404).json({ message: 'Catagory not found' });
    }
    req.body.slug = slugify(name, { lower: true });



    const { } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
        width: 500,
        crop: 'scale'
    });

    if (req.files.subImages) {
        for (const file of req.files.subImages) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'ecommerce/products/$',
                width: 500,
                crop: 'scale'
            });
            req.body.subImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }
    }

    req.body.mainImage = {secure_url, public_id};
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
    
    req.body.priceAfterDiscount = price - (price * (discount || 0 / 100));

}
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select('name price discount mainImage ');

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate('catagory', 'name')
            .populate('createdBy', 'name')
            .populate('updatedBy', 'name');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await cloudinary.uploader.destroy(product.mainImage.public_id);
        for (const image of product.subImages) {
            await cloudinary.uploader.destroy(image.public_id);
        }


        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}