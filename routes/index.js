import { Router } from 'express';
import { createUser, getUserLogs, getUsers } from '../controllers/user.js';
import { saveExercise } from '../controllers/exercises.js';
const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/users/:_id/exercises', saveExercise);
router.get('/users/:_id/logs', getUserLogs);

export default router;