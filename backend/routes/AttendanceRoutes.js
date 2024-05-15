import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {createAttendance, checkoutAttendance, getAttendance} from '../controllers/AttendanceController.js';

const router = express.Router();
router.post('/remark',createAttendance);
router.put('/remark/:id', checkoutAttendance);
router.get('/remark/get/:userId',getAttendance)

export default router;