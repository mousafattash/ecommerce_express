import express from "express";
import cors from "cors";
import connectdb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from './modules/catagory/category.router.js';
import productRouter from './modules/product/product.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';
import orderRouter from './modules/order/order.router.js';
import userRouter from './modules/user/user.router.js';

const initApp = (app) => {
  // Middleware
  app.use(cors());
  app.use(express.json());
  connectdb();

  // Routes
  app.use('/api/auth', authRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/products', productRouter);
  app.use('/api/coupons', couponRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/orders', orderRouter);
  app.use('/api/users', userRouter);

  // Welcome route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to E-Commerce API' });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
};

export default initApp;