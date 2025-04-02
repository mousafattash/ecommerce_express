import Category from './catagory.model.js';
import slugify from 'slugify';
import { auth } from '../../middleware/auth.js';


export const createCategory = async (req, res) => {
    const { name } = req.body;
    req.body.slug = slugify(name, { lower: true });
    req.body.createdBy = req.id;
    req.body.updatedBy = req.id;

    const catagory=await Category.create(req.body);
    if (!catagory) {
        return res.status(400).json({ message: 'Category creation failed' });
    }
    return res.status(201).json({ message: 'Category created successfully', category: catagory });


}
export const getAllCategories = async (req, res) => {

}


export const getActiveCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: 'active' })
            .populate('createdBy', 'name')
            .populate('updatedBy', 'name');
        return res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate('createdBy', 'name').populate('updatedBy', 'name');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json({ category });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const updateCategory = async (req, res) => {
    // try {
    //     const { id } = req.params;
    //     const { name, status, image } = req.body;
    //     const updatedBy = req.user._id;

    //     // Validate the input
    //     if (!name || !status || !image) {
    //         return res.status(400).json({ message: 'All fields are required' });
    //     }

    //     // Find and update the category
    //     const updatedCategory = await Category.findByIdAndUpdate(
    //         id,
    //         { name, status, image, updatedBy },
    //         { new: true }
    //     ).populate('createdBy', 'name').populate('updatedBy', 'name');

    //     if (!updatedCategory) {
    //         return res.status(404).json({ message: 'Category not found' });
    //     }

    //     return res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }

    const { id } = req.params;
    const { name } = req.body;
    const userId = req.id;
    const slug = slugify(name, { lower: true });
    req.body.slug = slug;
    req.body.updatedBy = userId;
    req.body.createdBy = userId;
    catagory.status = req.body.status;
    const catagory = await Category.findById(id);
}
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the category
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}