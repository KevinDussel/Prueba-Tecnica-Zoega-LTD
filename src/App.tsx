import React from 'react';
import TaskList from './components/TaskList';
import { useTheme } from './context/ThemeContext';
import './index.css';


const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
       <div className="min-h-screen bg-background dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 font-sans">
         <div className="max-w-3xl mx-auto py-10 px-6">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-primary">Prueba técnica Zoega LTD </h1>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {theme === "light" ? "Modo Oscuro" : "Modo Claro"}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4">
              <TaskList />
            </div>
          </div>
        </div>
  );
};

export default App;
