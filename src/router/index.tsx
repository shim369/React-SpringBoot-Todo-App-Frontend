import { Routes, Route } from 'react-router-dom'
import TaskList from '../pages/Task'
import TaskEdit from '../pages/TaskEdit'

function MyRouter() {
    return (
        <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        </Routes>
    )
}

export default MyRouter;