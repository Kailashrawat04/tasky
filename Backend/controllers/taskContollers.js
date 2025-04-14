const Task = require("../models/Task");

// @desc   Get all tasks (Admin: all, User: assigned tasks)
// @route  GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
     try { 
        const{ status } = req.query;
        let filter = {};

        if (status) {
            filter.status = status;
        }

        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find(filter).populate("assignedTo",
                 "name email profileImageUrl");
                 } else {
            tasks = await Task.find({ assignedTo: req.user._id, ...filter }).populate("assignedTo",
                "name email profileImageUrl");
                }

                // add completed todochecklist count to each task
                tasks =await Promise.all(
                    tasks.map(async (task) => {
                        const completedCount = task.todoChecklist.filter(
                            (item) => item.isCompleted
                        ).length;
                        return {
                            ...task._doc,
                            completedTodoCount:completedCount
                        };
                    })
                ); 
      
    // Status summary counts
    const allTasks = await Task.countDocuments(
        req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
        ...filter,
        status: "pending",
        ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    } );

    const inProgressTasks = await Task.countDocuments({
        ...filter,
        status: "In-progress",
        ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
        ...filter,
        status: "completed",
        ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.json({
        tasks,
        statusSummary: {
            all: allTasks,
            pendingTasks,
            inProgressTasks,
            completedTasks,
        },
 }); 
    
    }  
    catch (error) {
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

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoCheckList = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;


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

    }
catch (error) {
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
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        const isAssigned = task.assignedTo.some(
            (user) => user.toString() === req.user._id.toString()
        );
        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }

        task.status = req.body.status || task.status;

        if( task.status === "completed") {
          task.todoCheckList.forEach((item) => {
            item.Completed = true;
          } );
          task.progress = 100;
        }

    }
catch (error) {
    res.status(500).json({ message: "Server Error" });
}
};

// @desc   Update task checklist
// @route  PUT /api/tasks/:id/todo
// @access Private
const updateTaskChecklist = async (req, res) => {
    try {
        const { todoChecklist } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if(!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this task" });
        }
        task.todoChecklist = todoChecklist; // replace with update checklist

        // Auto-update progress based on checklist completion
        const completedCount = todoChecklist.filter(
            (item) => item.isCompleted
        ).length;
        const totalItems = todoChecklist.length;
        task.progress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

        // Auto-mark task as completed if all items are checked
        if (task.progress === 100) {
            task.status = "completed";
        }else if (task.progress>= 0){
         task.status = "In-progress";
        }else {
            task.status = "pending";
            }
        await task.save();
        const updatedTask = await Task.findById(req.params.id).populate("assignedTo",
            "name email profileImageUrl"
        );
        res.json({
            message: "Task checklist updated successfully",
            updatedTask,
        });

    }
catch (error) {
    res.status(500).json({ message: "Server Error" });
}
};

// @desc  Dashboard data (Admin only)
// @route GET /api/tasks/dashboard-data
// @access Private 
const getDashboardData = async (req, res) => {  try {
        
}
catch (error) {
res.status(500).json({ message: "Server Error" });}
};

// @desc  Dashboard data (User-specific)
// @route GET /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
    try {
        
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