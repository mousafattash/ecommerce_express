import cors from 'cors';
import connectdb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from './modules/catagory/catagory.router.js';
import productRouter from './modules/product/product.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';
const initApp=async(app, express)=>{
  app.use(express.json());
  app.use(cors());
  connectdb();

  app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
  }
  );
  app.use('/api/auth', authRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);
  app.use('/api/coupon', couponRouter);
  app.use('/api/cart', cartRouter);

    app.get('*', (req, res) => {
      return res.status(404).json({messafe:'Page not found'});
    });
  
};

export default initApp;