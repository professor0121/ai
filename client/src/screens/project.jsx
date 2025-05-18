import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { initializeSocket, recieveMessage, sendMessage } from '../config/socket';
import { UserContext } from '../context/user.context';
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or any style you like



const Project = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [project, setProject] = useState(location.state.project);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageBoxRef = useRef(null);
    const codeContainerRef = useRef(null);
    const [fileTree, setFileTree] = useState({})
    const [currencFile, setCurrencFile] = useState(null)
    const [openFiles, setOpenFiles] = useState([])



    useEffect(() => {
        initializeSocket(project._id);

        recieveMessage('project-message', (data) => {
            console.log(JSON.stringify(data.message))
            // const messageData=JSON.parse(data.message);
            // if(messageData.fileTree){
            //     setFileTree(messageData.fileTree)
            // }
            setMessages((prev) => [...prev, data]);
        });

        axios.get(`/project/get-project/${project._id}`)
            .then((res) => setProject(res.data.project))
            .catch(console.error);

        axios.get('/user/all')
            .then((res) => setUsers(res.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }

        if (codeContainerRef.current) {
            const blocks = codeContainerRef.current.querySelectorAll('pre code');
            blocks.forEach((block) => {
                hljs.highlightElement(block);
            });
        }
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleUserClick = (id) => {
        setSelectedUserIds((prev) =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const addCollaborator = () => {
        axios.put('/project/add-user', {
            projectId: project._id,
            users: selectedUserIds,
        }).then(() => setIsOpenModal(false))
            .catch(console.error);
    };

    const send = () => {
        if (!message) return;

        const newMsg = {
            message,
            sender: user,
        };

        sendMessage('project-message', newMsg);
        setMessages((prev) => [...prev, newMsg]);
        setMessage('');
    };

    return (
        <main className="h-screen w-full flex bg-white">
            {/* LEFT PANEL */}
            <section className="flex flex-col left h-screen min-w-96 bg-slate-200">
                <header className="flex w-full justify-between px-4 py-3 h-16 bg-slate-100">
                    <button onClick={() => setIsOpenModal(true)} className="p-2 flex gap-2 items-center">
                        <i className="ri-add-fill" />
                        <span className="text-sm">Add User</span>
                    </button>
                    <button onClick={() => setIsPanelOpen(!isPanelOpen)} className="p-2">
                        <i className="ri-group-fill" />
                    </button>
                </header>

                {/* CHAT AREA */}
                <div className="coversation-area flex flex-col h-[91%]">
                    <div
                        ref={(el) => {
                            messageBoxRef.current = el;
                            codeContainerRef.current = el;
                        }}
                        className="message-box flex-grow flex flex-col py-4 px-2 gap-2 overflow-auto no-scrollbar"
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`message max-w-72 flex flex-col p-2 w-fit rounded-md ${msg.sender._id === user._id ? 'ml-auto bg-blue-300' : 'bg-slate-300'
                                    }`}
                            >
                                <small className="opacity-50 text-xs">{msg.sender.email}</small>
                                <div className='overflow-auto'>
                                    <Markdown className="text-sm overflow-auto">{msg.message}</Markdown>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* INPUT */}
                    <div className="input-field flex justify-between px-4 py-3 h-16 bg-slate-50">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder="Message now..."
                            className="w-full border-none outline-none bg-transparent px-2"
                        />
                        <button onClick={send} className="flex gap-2 border border-slate-500 px-4 py-1 rounded-xl">
                            <span>Send</span>
                            <i className="ri-send-plane-2-fill" />
                        </button>
                    </div>
                </div>

                {/* SIDE PANEL */}
                <div
                    className={`sidePanel flex flex-col gap-2 w-96 h-full absolute top-0 bg-slate-200 transition-transform ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <header className="flex justify-between px-4 py-3 bg-slate-100 items-center">
                        <h1>Collaborators</h1>
                        <button onClick={() => setIsPanelOpen(false)} className="p-2">
                            <i className="ri-close-line" />
                        </button>
                    </header>
                    <div className="colleberators flex flex-col gap-2">
                        {project.users.map((user) => (
                            <div key={user._id} className="flex gap-4 items-center p-2 hover:bg-slate-300 cursor-pointer">
                                <div className="w-12 h-12 flex items-center justify-center bg-slate-500 rounded-full">
                                    <i className="ri-user-fill text-white text-lg" />
                                </div>
                                <h1 className="text-lg">{user.email}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*Code Editor*/}
            <section className='RightSide flex h-screen w-full bg-gray-800'>
                <div className='fileTree-exprlorer h-screen min-w-40 max-w-52 p-2'>
                    <div className='fileTree flex flex-col gap-2 '>
                        {
                            Object.keys(fileTree).map((file, index) => (
                                <button
                                    onClick={() => {
                                        setCurrencFile(file),
                                        setOpenFiles([...new Set([ ...openFiles,file])])
                                    }}
                                    key={index} className='treeElement flex items-center gap-2  w-full'>
                                    <p className='cursor-pointer font-semibold text-lg text-[#ffffff]'>{file}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className=" w-px bg-gray-100" />
                {/* code editor */}
                {
                    currencFile && (
                        <div className='flex flex-col codeEditor text-blue-50 h-full w-full'>
                            <div className='top flex gap-2'>
                                {
                                    openFiles.map((file,index)=>(
                                        <button
                                        onClick={()=>setCurrencFile(file)}
                                        className='font-semibold lext-lg cursor-pointer w-fit px-2 py-1 bg-gray-500'>
                                            {file}
                                        </button>
                                    ))
                                }
                            </div>
                            <div className="h-px bg-gray-100" />
                            <div className='Bottom flex flex-grow'>
                                {
                                    fileTree[currencFile]&&(
                                        <textarea 
                                        value={fileTree[currencFile].contents}
                                        onChange={(e)=>{
                                            setFileTree({
                                                ...fileTree,[currencFile]:{
                                                    contents:e.target.value
                                                }
                                            })
                                        }}
                                        className='w-full h-full p-4 border-none outline-none bg-transparent'
                                        ></textarea>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

            </section>

            {/* MODAL */}
            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
                    <div className="flex flex-col h-96 w-96 bg-slate-100 rounded-lg overflow-hidden">
                        <header className="flex justify-between px-4 py-3 bg-slate-300">
                            <div />
                            <h1>Add Users</h1>
                            <button onClick={() => setIsOpenModal(false)}>
                                <i className="ri-close-line" />
                            </button>
                        </header>
                        <div className="flex-grow overflow-auto">
                            {users.map((u) => (
                                <div
                                    key={u._id}
                                    className={`flex gap-4 items-center p-2 ${selectedUserIds.includes(u._id) ? 'bg-slate-200' : ''
                                        } cursor-pointer`}
                                    onClick={() => handleUserClick(u._id)}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center bg-slate-500 rounded-full">
                                        <i className="ri-user-fill text-white" />
                                    </div>
                                    <h1 className="text-base">{u.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button onClick={addCollaborator} className="p-3 bg-blue-500 text-white font-semibold">
                            Add Collaborator
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Project;
