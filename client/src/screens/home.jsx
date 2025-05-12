import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios.js'

const Home = () => {
  const { user } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const token=localStorage.getItem('token');
  const handleCreateProject = (e) => {
    e.preventDefault();
    // if (!projectName.trim()) return;
    // Handle API call or context update here
    axios.post('/project/create',{
      name:projectName
    }).then((res)=>{
      console.log(res.data)
    })

    console.log('Creating project:', projectName);
    setIsOpenModal(false);
    setProjectName('');
  };

  return (
    <main className='p-4 relative'>
      <div className='projects'>
        <button
          onClick={() => setIsOpenModal(true)}
          className='project px-4 py-2 border rounded-xl border-slate-300 hover:bg-slate-100'
        >
          <i className='ri-link' /> Create Project
        </button>
      </div>

      {/* Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-400 border-slate-300  bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Create New Project</h2>
              <button
                onClick={() => setIsOpenModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpenModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
