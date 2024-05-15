
import express from 'express';
import { 
    authUser,
    registerUser,
    logoutUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
   
  } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { loginValidation, registerValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/create',registerValidation, registerUser);
router.post('/auth',loginValidation, authUser);
router.post('/logout', logoutUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
export default router;