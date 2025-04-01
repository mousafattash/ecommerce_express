export const createCategory = async (req, res) => {
    try {
        const { name, status, image } = req.body;
        const createdBy = req.user._id; // Assuming you have user info in req.user
        const updatedBy = req.user._id;

        // Validate the input
        if (!name || !status || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new category
        const newCategory = new Category({
            name,
            slug: name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
            status,
            image,
            createdBy,
            updatedBy
        });

        await newCategory.save();

        return res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('createdBy', 'name').populate('updatedBy', 'name');
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
    try {
        const { id } = req.params;
        const { name, status, image } = req.body;
        const updatedBy = req.user._id;

        // Validate the input
        if (!name || !status || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find and update the category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, status, image, updatedBy },
            { new: true }
        ).populate('createdBy', 'name').populate('updatedBy', 'name');

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
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