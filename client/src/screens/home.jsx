import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context';
import axios from '../config/axios.js';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  const { user } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [project, setProject] = useState([]);
  const token = localStorage.getItem('token');
  const handleCreateProject = (e) => {
    e.preventDefault();
    // if (!projectName.trim()) return;
    // Handle API call or context update here
    axios.post('/project/create', {
      name: projectName
    }).then((res) => {
      console.log(res.data)
    })

    console.log('Creating project:', projectName);
    setIsOpenModal(false);
    setProjectName('');
  };

  useEffect(() => {
    axios.get('/project/all')
      .then((res) => {
        // console.log(res.data.projects)
        setProject(res.data.projects)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  console.log(project)
  // console.log


  return (
    <main className='p-4 relative'>
      <div className='projects flex flex-wrap gap-2'>
        <button
          onClick={() => setIsOpenModal(true)}
          className='project px-4 py-2 border cursor-pointer rounded-xl border-slate-300 hover:bg-slate-100'
        >
          <i className='ri-link' /> Create Project
        </button>
        {
          project.map((project) => (
            <div key={project._id}
          onClick={()=>navigate('/project',{ state:{project}})}
            className='project flex flex-col gap-1 px-4 py-2 border cursor-pointer rounded-xl border-slate-300 hover:bg-slate-100'>
              <div>{project.name}</div>
              <div className='flex gap-1'><span><i class="ri-user-line"></i></span><span>Collaborator</span><span>{project.users.length}</span></div>
            </div>
          ))
        }
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
