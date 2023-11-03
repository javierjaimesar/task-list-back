import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        // const useId = req.body.user.id;

        console.log(req);

        const tasks = await Task.find({ user: useId }).populate('user')
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getTask = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id;

        const task = await Task.findById(id).populate('user')

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }
        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            user: req.user.id
        });
        const savedTask = await newTask.save();
        console.log(savedTask);
        res.status(201).json(savedTask);

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }
        res.json({ message: 'Task deleted' })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(title, description);
        const taskUpdated = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { title, description },
            { new: true }
        );
        res.json(taskUpdated)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}