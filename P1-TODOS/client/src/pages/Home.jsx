import { useState, useEffect, useRef, useContext } from "react";
import fetchTask from "../utils/fetchTask";
import UserContext from "../context/UserContext";
import postTask from "../utils/postTask";
import putToggle from "../utils/handleToggle";
import deleteTaskAPI from "../utils/deleteTask";

function Home() {
    const [ input, setInput ] = useState("");
    const {uid} = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        console.log("User ID", uid)
        if (hasFetched.current) return; // Prevent multiple calls
        
        hasFetched.current = true;
        fetchTask(uid)
            .then(data => {
                console.log("Fetched data:", data);
                console.log("Is array:", Array.isArray(data));
                
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    console.warn("API returned non-array data:", data);
                    setTasks([]);
                }
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
                setTasks([]);
            });
    })

    const handleSubmit = async () => {
        if (input.trim() === "") return;
        
        const newTask = {
            uid: uid,
            description: input.trim()
        };
        
        try {
            const createdTask = await postTask(newTask);
            setTasks([...tasks, createdTask]);
            setInput("");
        } catch (error) {
            console.log("Failed to create task:", error);
        }
    }

    const toggleTask = async (id) => {
        const taskId = { _id : id}
        await putToggle(taskId);
        setTasks(tasks.map(task => 
            (task._id || task.id) === id ? { ...task, completed: !task.completed } : task
        ));
    }
    
    const deleteTask = async (id) => { 
        try {
            const taskId = { _id : id}
            await deleteTaskAPI(taskId);
            setTasks(tasks.filter(task => (task._id) !== id));
        } catch (error) {
            console.log("Failed to delete task:", error);
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">My Todo List</h1>
                    <p className="text-gray-600">Stay organized and get things done</p>
                </div>

                {/* Add Task Input */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex gap-3">
                        <input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add a new task..." 
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />
                        <button 
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                            onClick={handleSubmit}
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tasks ({tasks.length})</h2>
                        <div className="grid gap-4">
                            {tasks.map(task => (
                                <div 
                                    key={task._id} 
                                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed}
                                            onChange={() => toggleTask(task._id)}
                                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span 
                                            className={`flex-1 text-gray-800 text-lg ${
                                                task.completed 
                                                    ? 'line-through text-gray-500' 
                                                    : 'font-medium'
                                            }`}
                                        >
                                            {task.description || task.text}
                                        </span>
                                        <div className="flex gap-2">
                                            <button 
                                                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                                                title="Edit task"
                                                aria-label="Edit task"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                                onClick={() => deleteTask(task._id)}
                                                title="Delete task"
                                                aria-label="Delete task"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Total: {tasks.length} tasks</span>
                        <span>Completed: {tasks.filter(t => t.completed).length}</span>
                        <span>Remaining: {tasks.filter(t => !t.completed).length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;