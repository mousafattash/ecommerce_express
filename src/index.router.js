import cors from 'cors';
import connectdb from '../DB/connection.js';

const initApp=async(app, express)=>{
  app.use(express.json());
  app.use(cors());
  connectdb();

    app.get('*', (req, res) => {
      return res.status(404).json({messafe:'Page not found'});
    });
  
};

export default initApp;