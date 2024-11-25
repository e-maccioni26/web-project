import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
      const myUsers = await User.findAll();
      console.log(myUsers);
    res.send(myUsers);
});

export default router;