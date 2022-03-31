import './App.css';
import Header from './component/Header';
import { Tasks } from './component/Tasks';
import { useState, useEffect } from "react"
import { AddTask } from './component/AddTask';
import { Footer } from './component/Footer';
import { About } from './component/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
 const [showAddtask, setShowAddTask] = useState(false);
 const [tasks, setTasks] = useState([])
 useEffect(() => {
 const getTasks = async () => {
 const tasksFromServer = await fetchTasks();
 setTasks(tasksFromServer);
 }
 getTasks();
 }, []);
 //fetch tasks
 const fetchTasks = async () => {
 const res = await fetch('http://localhost:5000/tasks');
 const data = await res.json();
 // console.log(data);
 return data;
 }
 //fetch task
 const fetchTask = async (id) => {
 const res = await fetch(`http://localhost:5000/tasks/${id}`);
 const data = await res.json();
 // console.log(data);
 return data;
 }
 //Add Task
 const addTask = async (task) => {
 const res = await fetch('http://localhost:5000/tasks', {
 method: 'POST',
 headers: { 'Content-type': 'application/json', },
 body: JSON.stringify(task),
 });
 const data = await res.json();
 setTasks([...tasks, data]);
 }
 //Delete Task
 const deleteTask = async (id) => {
 await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE', })
 setTasks(tasks.filter((task) => task.id !== id));
 console.log('Delete ', id);
 }
 //Toggle Reminder
 const toggleReminder = async (id) => {
 const taskToToggle = await fetchTask(id);
 const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
 const res = await fetch(`http://localhost:5000/tasks/${id}`, {
 method: 'PUT',
 headers: {
 'Content-type': 'application/json',
 },
 body: JSON.stringify(updTask)
 })
 const data = await res.json();
 setTasks(tasks.map((task) =>
 task.id === id ? { ...task, reminder: data.reminder } : task
 ))
 console.log(id);
 }
 return (
 <Router>
 <div className='container'>
 <Header
 onAdd={() => setShowAddTask(!showAddtask)} showAdd={showAddtask} />
 <Routes>
 <Route
 path='/'
 element={
 <>
 {showAddtask && <AddTask onAdd={addTask} />}
 {tasks.length > 0 ? (
 <Tasks
 tasks={tasks}
 onDelete={deleteTask}
 onToggle={toggleReminder}
 />
 ) : (
 'No Tasks To Show'
 )}
 </>
 }
 />
 <Route path='/about' element={<About />} />
 </Routes>
 <Footer />
 </div>
 </Router>
 );
}
export default App;