import React,{useState, useEffect} from "react";


interface Todo {
    id: number; 
    title: string;
    completed: boolean;
}


const  TaskList: React.FC = () => {

    const [tasks, setTasks] = useState<Todo[]>(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    }
    );
    const [filter,setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

   const fetchTasks = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };


useEffect(() => {  
    if (tasks.length === 0) {   
    fetchTasks();
    }
}); 


useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


const toggleTask = (id: number) => {
    setTasks((prevTasks) => 
        prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
}
const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));   
}

const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all'
}); 
return (
    <div>
        <h1 className="text-2xl font-bold text-center font-sans mb-4 ">Lista de tareas</h1>
        
        <div className="flex justify-end mb-4">
            <select
                className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md p-2 mb-4 " 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as 'all' | 'completed' | 'incomplete')}>
                <option value="all">Todas</option>  
                <option value="completed">Completadas</option>
                <option value="incomplete">Incompletas</option>
            </select>
        </div>
        <ul>
            {filteredTasks.map((task) => (
                <li
                    className="flex items-center justify-between p-2" 
                     key={task.id}>
                    <input 
                        className="mr-2"
                        checked={task.completed} 
                        onChange={() => toggleTask(task.id)} 
                        type="checkbox" />
                    {task.title}
                  <div className="flex justify-end mb-2">
                    <button 
                        className= "bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md p-2 mb-4 hover:bg-blue-700 hover:text-white" 
                        onClick={() => deleteTask(task.id)}>
                        Eliminar
                    </button>
                  </div>
                </li>


            ))}
        </ul>
    </div>
);
}

export default TaskList;
