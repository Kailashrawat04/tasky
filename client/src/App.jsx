import React from 'react'
import{ BrowserRouter as Router,
   Routes,
   Route }
    from 'react-router-dom'

const App = () => {
  return (
    <div >
    <Router>
       <Routes>
        <Route path='"/Login"' element={<Login />} />
        <Route path='"/signup"' element={<Signup />} />

        {/* Admin Routes */}
        
        <Route element={<privateRoute allowedRoles={['admin']} />}>
          <Route path='/admin/manage-tasks' element={<ManageTasks />} />
          <Route path='/admin/create-task' element={<CreateTask />} />
        </Route>

       </Routes>
    </Router>
    </div>
  )
}

export default App
