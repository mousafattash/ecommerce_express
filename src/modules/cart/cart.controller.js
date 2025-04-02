import Cart from "../../../DB/models/cart.model.js";

export const addToCart = async (req, res) => {
    // const { productId, quantity } = req.body;
    // const userId = req.user._id;

    // try {
    //     // Check if the product is already in the cart
    //     let cartItem = await Cart.findOne({ userId, productId });

    //     if (cartItem) {
    //         // If the product is already in the cart, update the quantity
    //         cartItem.quantity += quantity;
    //         await cartItem.save();
    //     } else {
    //         // If the product is not in the cart, create a new cart item
    //         cartItem = new Cart({ userId, productId, quantity });
    //         await cartItem.save();
    //     }

    //     return res.status(200).json({ message: 'Product added to cart successfully', cartItem });
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal server error' });
    // }

    const { productId } = req.body;
    const cart = await Cart.findOne({userId:req.id});
    if (!cart) {
        const newCart = await Cart.create({userId:req.id, products:[productId]});
        return res.status(201).json({message:'Cart created successfully', cart:newCart});
    }

    for(let i=0; i<cart.products.length; i++){
        if(cart.products[i] == productId){
            return res.status(400).json({message:'Product already in cart'});
        }
    }
    cart.products.push(productId);
    await cart.save();

    return res.status(200).json({message:'Product added to cart successfully', cart});

}