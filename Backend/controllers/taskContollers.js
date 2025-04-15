const Task = require("../models/Task");

// @desc   Get all tasks (Admin: all, User: assigned tasks)
// @route  GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        const isAdmin = req.user.role === "admin";
        const userFilter = isAdmin ? {} : { assignedTo: req.user._id };

        const baseFilter = { ...filter, ...userFilter };

        let tasks = await Task.find(baseFilter)
            .populate("assignedTo", "name email profileImageUrl")
            .lean(); // improve performance

        tasks = tasks.map((task) => {
            const completedCount = task.todoChecklist?.filter((item) => item.isCompleted).length || 0;
            const totalCount = task.todoChecklist?.length || 0;

            return {
                ...task,
                completedTodoCount: completedCount,
                totalTodoCount: totalCount,
            };
        });

        // Helper to count tasks by status
        const countByStatus = async (status) =>
            await Task.countDocuments({
                ...userFilter,
                status,
            });

        const [allTasks, pendingTasks, inProgressTasks, completedTasks] = await Promise.all([
            Task.countDocuments(userFilter),
            countByStatus("pending"),
            countByStatus("In-progress"),
            countByStatus("completed"),
        ]);

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// @desc   Get task by ID
// @route  GET /api/tasks/:id
// @access Private
const getTaskById = async (req, res) => { 
    try {
        const task =await Task.findById(req.params.id).populate("assignedTo",
            "name email profileImageUrl"
        );
        if (!task) 
            return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    } };
// @desc   Create a new task(Admin only)
// @route  POST /api/tasks
// @access Private(Admin )
const createTask = async (req, res) => {
    try {
        const { title,
             description,
              priority,
              dueDate,
              assignedTo,
              attachments,
              todoChecklist,
             } = req.body;

             if(!Array.isArray(assignedTo)) {
                return res.status(400).json({ message: "assignedTo smust be an array of user Is" });
             }

             const task =  await Task.create({
                title,
                description,
                priority,
                dueDate,
                assignedTo,
                createdBy: req.user._id,
                attachments,
                todoChecklist,
             });
                res.status(201).json({
                    message: "Task created successfully",
                    task,
                });

         
    }
catch (error) {
    res.status(500).json({ message: "Server Error" });
}
};

// @desc   Update task details
// @route  PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        // Optional: authorization check
        const isAssigned = task.assignedTo.some(
            (user) => user.toString() === req.user._id.toString()
        );
        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        // Update fields only if they're defined
        if (req.body.title != null) task.title = req.body.title;
        if (req.body.description != null) task.description = req.body.description;
        if (req.body.priority != null) task.priority = req.body.priority;
        if (req.body.dueDate != null) task.dueDate = req.body.dueDate;
        if (req.body.todoChecklist != null) task.todoChecklist = req.body.todoChecklist;
        if (req.body.attachments != null) task.attachments = req.body.attachments;

        // Validate & assign users
        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res.status(400).json({ message: "assignedTo must be an array of user IDs" });
            }
            task.assignedTo = req.body.assignedTo;
        }

        const updatedTask = await task.save();

        res.json({
            message: "Task updated successfully",
            updatedTask,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// @desc   Delete task (Admin only)
// @route  DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        await task.deleteOne();
        res.json({ message: "Task deleted successfully" });
    }
catch (error) {
    res.status(500).json({ message: "Server Error" });
}
};

// @desc   Update task status
// @route  PUT /api/tasks/:id/status
// @access Private
const updateTaskStatus = async (req, res) => {
    try {
        // Check if task exists
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Log assignedTo to check if it's an array
        console.log('Assigned To:', task.assignedTo);

        // Check if assignedTo is an array, and handle the corrupted data case
        if (!Array.isArray(task.assignedTo)) {
            task.assignedTo = [];  // Fallback to an empty array
            return res.status(500).json({ message: "Assigned users data is corrupted" });
        }

        // Check if the user is authorized to update the task (assigned user or admin)
        const isAssigned = task.assignedTo.some(
            (user) => user.toString() === req.user._id.toString()
        );

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        // Validate the provided status
        const validStatuses = ["pending", "In-progress", "completed"];
        let newStatus = req.body.status;

        // Normalize status: replace spaces with hyphens for consistency
        if (newStatus) {
            newStatus = newStatus.replace(/\s+/g, "-").toLowerCase();
        }

        // Check if status is valid
        if (newStatus && !validStatuses.includes(newStatus)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // If the status is valid, update the task status
        if (newStatus) {
            task.status = newStatus;
        }

        // If status is 'completed', mark all checklist items as completed
        if (task.status === "completed") {
            task.todoChecklist.forEach((item) => {
                item.isCompleted = true;
            });
            task.progress = 100;
        }

        // Save the updated task
        await task.save();

        // Retrieve the updated task with populated assigned users
        const updatedTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        return res.status(200).json({
            message: "Task status updated successfully",
            updatedTask,
        });

    } catch (error) {
        console.error(error);  // Logging the error for debugging
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// @desc   Update task checklist
// @route  PUT /api/tasks/:id/todo
// @access Private
const updateTaskChecklist = async (req, res) => {
    try {
        const { todoChecklist } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        // Update checklist
        task.todoChecklist = todoChecklist;

        // Auto-update progress
        const completedCount = todoChecklist.filter(item => item.isCompleted).length;
        const totalItems = todoChecklist.length;
        task.progress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

        // Auto-update status
        if (totalItems === 0) {
            task.status = "pending";
        } else if (task.progress === 100) {
            task.status = "completed";
        } else {
            task.status = "In-progress";
        }

        await task.save();

        const updatedTask = await Task.findById(req.params.id).populate("assignedTo", "name email profileImageUrl");

        res.json({
            message: "Task checklist updated successfully",
            updatedTask,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// @desc  Dashboard data (Admin only)
// @route GET /api/tasks/dashboard-data
// @access Private 
const getDashboardData = async (req, res) => {
    try {
        // Fetch statistics
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "pending" });
        const completedTasks = await Task.countDocuments({ status: "completed" });
        const overdueTasks = await Task.countDocuments({
            dueDate: { $lt: new Date() },
            status: { $ne: "completed" },
        });

        // Task status distribution
        const taskDistribution = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskDistributionMap = taskDistribution.reduce((acc, status) => {
            const formattedKey = status._id.replace(/\s+/g, "");
            acc[formattedKey] = status.count || 0;
            return acc;
        }, {});

        taskDistributionMap["all"] = totalTasks;

        // Task priority distribution
        const taskPriorities = ["low", "medium", "high"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityLevelsRaw.find(
                (item) => item._id === priority
            )?.count || 0;
            return acc;
        }, {});

        // Recent tasks
        const recentTasks = await Task.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

        res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts: {
                taskDistribution: taskDistributionMap,
                taskPriorityLevels,
            },
            recentTasks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// @desc  Dashboard data (User-specific)
// @route GET /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;// only fetch data for the logged-in user

        // Fetch statistics for user-specific tasks
        const totalTasks = await Task.countDocuments({ assignedTo: userId });
        const pendingTasks = await Task.countDocuments({
            assignedTo: userId,
            status: "pending",
        });
        const completedTasks = await Task.countDocuments({
            assignedTo: userId,
            status: "completed",
        });
        const overdueTasks = await Task.countDocuments({
            assignedTo: userId,
            status: { $ne: "completed" },
            dueDate: { $lt: new Date() },
        });

        //Task distribution by status
        const taskStatuses = ["pending", "In-progress", "completed"];
        const taskDistributionRaw = await Task.aggregate([
            { $match: { assignedTo: userId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            }, ]);
        const taskDistribution= taskStatuses.reduce((acc, status) => {
            const formattedkey = status.replace(/\s+/g, "");
            acc[formattedkey] = taskDistributionRaw.find(
                (item) => item._id === status
            )?.count || 0;
            return acc;
            }, {});
            taskDistribution["All"] = totalTasks;
            
        // Task distribution by priority
        const taskPriorities = ["Low", "Medium", "High"];
        const taskPriorityDistributionRaw = await Task.aggregate([
            { $match: { assignedTo: userId } },
            { $group: { _id: "$priority", count: { $sum: 1 } } },
            ]);


        const taskPriorityDistribution = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityDistributionRaw.find(item => item._id === priority)?.count || 0;
            return acc;
            }, {});

            // Fetch recent 10 tasks for the user
            const recentTasks = await Task.find({ assignedTo: userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

            res.status(200).json({
                statistics: {
                    totalTasks,
                    pendingTasks,
                    completedTasks,
                    overdueTasks,
                },
                charts: {
                    taskDistribution,
                    taskPriorityDistribution,
                },
                recentTasks,
            });




        
    }
catch (error) {
    res.status(500).json({ message: "Server Error" });
}
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData,
};