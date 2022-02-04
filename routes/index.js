import { Router } from 'express';
import { createUser, getUsersLogs, getUsers } from '../controllers/user.js';
import { createExercise } from '../controllers/exercises.js';
const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/users/:_id/exercises', createExercise);
router.get('/users/:_id/logs', getUsersLogs);

export default router;