const Task = require('../models/Task.js');
const User = require('../models/User.js');
const excel = require('exceljs');

// @desc Export all tasks as an Excel file
// @route GET /api/reports/export/tasks
// @access Private/Admin
const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate("assignedTo", "name email").populate("createdBy", "name email");

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet("Tasks Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
            { header: "Due Date", key: "dueDate", width: 20 },
        ];

        tasks.forEach((task) => {
            const assignedTo = task.assignedTo
            .map((user) => `${user.name} (${user.email})`).join(", ");
            worksheet.addRow([
                task._id,
                task.title,
                task.description,
                task.priority,
                task.status,
                assignedTo,
                task.dueDate.toISOString().split("T")[0]
            ]);
    });

    res.setHeader("Content-Type",
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    
     res.setHeader("Content-Disposition", 
        "attachment; filename=tasks_report.xlsx");   
        
     
        return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
        });
    

} 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } };

// @desc Export user-task report as an Excel file
// @route GET /api/reports/export/users
// @access Private/Admin
const exportUserReport = async (req, res) => {
    try {
        const users = await User.find().select(" name email_id").lean();
        const userTasks = await Task.find().populate("assignedTo", "name email_id");

        const userTaskMap = {};
        userTasks.forEach((user) => {
        userTaskMap[user._id] = {
            name: user.name,
            email: user.email,
            taskCount: 0,
            pendingTasks: 0,
            inProgressTasks: 0,
            completedTasks: 0,
        };
        } );

        userTasks.forEach((task) => {
            if (task.assignedTo) {
                task.assignedTo.forEach((assignedUser) => {
                    if (userTaskMap[assignedUser._id]) {
                        userTaskMap[assignedUser._id].taskCount += 1;
                        if (task.status === "Pending") {
                            userTaskMap[assignedUser._id].pendingTasks += 1;
                        } else if (task.status === "In Progress") {
                            userTaskMap[assignedUser._id].inProgressTasks += 1;
                        } else if (task.status === "Completed") {
                            userTaskMap[assignedUser._id].completedTasks+= 1;
                        }
                    }
                });
            }
        });

        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet("User Task Report");
        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: " Email", key: "email", width: 40 },
            { header: "Total Assined Tasks", key: "taskCount", width: 20 },
            { header: "Pending Tasks", key: "pendingTasks", width: 20 },
            { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
            { header: "Completed Tasks", key: "completedTasks", width: 20 },
        ];

        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
            });
            
         res.setHeader("Content-Type",
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

         return workbook.xlsx.write(res).then(() => {
            res.status(200).end();
            });
    

    








    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } 
};

module.exports = {
    exportTasksReport,
    exportUserReport
};