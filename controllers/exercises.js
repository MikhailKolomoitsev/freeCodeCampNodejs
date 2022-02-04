import Exercise from '../models/exercise.js';
import { getUserByIdAndHandleError } from './user.js';

export const saveExercise = async (req, res) => {
  const user = await getUserByIdAndHandleError(req.params._id);
  try {
    const { description, duration, date } = req.body;
    const newExercise = new Exercise({
      username: user.username,
      date: date ? new Date(date) : new Date(),
      duration: parseInt(duration, 10),
      description,
    });
    const exerciseSaved = await newExercise.save();

    res.status(201).json({
      _id: user._id,
      username: exerciseSaved.username,
      date: exerciseSaved.date.toDateString(),
      duration: exerciseSaved.duration,
      description: exerciseSaved.description,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

export const countExercises = async (query = {}) => {
  try {
    return await Exercise.countDocuments(query);
  } catch (error) {
    console.error(error);
    return -1;
  }
};

export const findExercies = async (query = {}, limit = Number.MAX_SAFE_INTEGER) => {
  try {
    return await Exercise.find(query).limit(limit);
  } catch (error) {
    console.error(error);
    return [];
  }
};
