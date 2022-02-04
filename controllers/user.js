import User from '../models/user.js';
import { countExercises, findExercies } from './exercises.js';

export const createUser = async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = new User({ username });
    const userCreated = await newUser.save();
    res.status(201).json({ _id: userCreated._id, username: userCreated.username });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

export const getUsers = async (req, res) => {
  const { name, id } = req.query;
  const query = {};
  if (name) query.username = name;
  if (id) query._id = id;

  try {
    const usersFound = await User.find(query, { _id: 1, username: 1 });
    res.status(200).json(usersFound);
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};

export const getUserLogs = async (req, res) => {
  const { from, to, limit } = req.query;
  const maxNumberLogs = limit ? limit : Number.MAX_SAFE_INTEGER;

  try {
    const { _id, username } = await getUserByIdAndHandleError(req.params._id);
    const query = { username };
    if (from) query.date = { $gte: new Date(from) };
    if (to) query.date = { ...query.date, ...{ $lte: new Date(to) } };

    const userExercises = await findExercies(query, maxNumberLogs);
    const totalExercises = await countExercises({ username });

    res.status(200).json({
      username,
      count: totalExercises,
      _id: _id.toString(),
      log: userExercises.map((exercise) => {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString(),
        };
      }),
    });
  } catch (error) {
    res.status(404).json({ error: error.message || error });
  }
};

export const findUserById = async (_id) => await User.findById(_id);

export const getUserByIdAndHandleError = async (id, res) => {
  let user = undefined;

  try {
    user = await findUserById(id);
    if (!user)
      return res.status(404).json({
        error: `User with id <${id}> not found. If you don't have an _id, create one.`,
      });
  } catch (error) {
    return res.status(404).json({
      error: `User with id <${id}> not found. If you don't have an _id, create one.`,
    });
  }

  return user;
};
