import React from 'react'
import{ BrowserRouter as Router,
   Routes,
   Route,
   Navigate }
from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/SignUp'
import Dashboard from './pages/admin/Dashboard'
import ManageTasks from './pages/admin/ManageTasks'
import CreateTask from './pages/admin/CreateTask'
import ManageUsers from './pages/admin/ManageUsers'
import UserDashboard from './pages/User/UserDashboard'
import MyTasks from './pages/User/MyTasks'
import ViewTaskDetails from './pages/User/ViewTaskDetails'
import PrivateRoute from './routes/PrivateRoute'


const App = () => {
  return (
    <div >
    <Router>
       <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Admin Routes */}
        
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path="/admin/tasks" element={<ManageTasks/>} />
          <Route path='/admin/create-task' element={<CreateTask/>} />
          <Route path='/admin/users' element={<ManageUsers />} />
        </Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path='/user/user-dashboard' element={<UserDashboard />} />
          <Route path='/user/My-tasks' element={<MyTasks />} />
          <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
          </Route>
       </Routes>
    </Router>
    </div>
  )
}

export default App
