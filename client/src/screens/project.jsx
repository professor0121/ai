import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';


const project = () => {
    const location = useLocation();
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    console.log(location.state)
    return (
        <main className='h-screen w-full flex bg-white'>
            <section className='flex flex-col left h-full min-w-96 bg-slate-200'>
                <header className='flex justify-between px-4 py-3 bg-slate-100'>
                    <button className='p-2 cursor-pointer flex gap-2 items-center'
                        onClick={() => setIsOpenModal(!isOpenModal)}>
                        <i className='ri-add-fill'></i>
                        <p className='text-sm'>Add User</p>
                    </button>
                    <button className='p-2 cursor-pointer ' onClick={() => setIsPanelOpen(!isPanelOpen)}>
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="coversation-area flex flex-col flex-grow">
                    <div className="message-box flex-grow flex flex-col py-4 px-2 gap-2">
                        <div className="incoming-message max-w-72 flex flex-col flex-wrap bg-slate-300 p-2 w-fit rounded-md">
                            <small className='text-xs opacity-50' >example@gmail.com</small>
                            <p className='text-sm'>Lorem ipsum dolor sit d. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus, dolorem.</p>
                        </div>
                        <div className="ml-auto max-w-72 outgoing-message flex flex-col bg-slate-300 p-2 w-fit rounded-md">
                            <small className='text-xs opacity-50' >example@gmail.com</small>
                            <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className="input-field flex justify-between px-4 py-3 bg-slate-50">
                        <input type="text" placeholder='Message now...' className='w-full appearance-none border-none outline-none bg-transparent px-2 m-0 shadow-none ring-0' />
                        <button className='flex gap-2 border border-slate-500 px-4 py-1 rounded-xl cursor-pointer'>
                            <span>Send</span>
                            <i class="ri-send-plane-2-fill"></i>
                        </button>
                    </div>
                </div>
                <div className={`sidePanel flex flex-col gap-2 w-96 h-full absolute transition-all ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0 bg-slate-200`}>
                    <header className='flex justify-end px-4 py-3 bg-slate-100'>
                        <button className='p-2 cursor-pointer ' onClick={() => setIsPanelOpen(!isPanelOpen)}>
                            <i className="ri-close-line"></i>
                        </button>
                    </header>
                    <div className="colleberators flex flex-col gap-2">
                        <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                            <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                            <h1 className='text-[18px]'>name of user</h1>
                        </div>
                    </div>
                </div>
            </section>
            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="flex flex-col h-96 w-96 bg-slate-100">
                        <header className='flex justify-between px-4 py-3 bg-slate-300'>
                            <div></div>
                            <h1>Add Users</h1>
                            <button className='cursor-pointer ' onClick={() => setIsOpenModal(!isOpenModal)}>
                                <i className="ri-close-line"></i>
                            </button>
                        </header>
                        <div className='flex-grow relative flex flex-col overflow-auto'>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                            <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-slate-300'>
                                <div className='flex justify-center items-center w-fit h-fit p-6 bg-slate-500 rounded-[100%]'><i className="ri-user-fill absolute"></i></div>
                                <h1 className='text-[18px]'>name of user</h1>
                            </div>
                        </div>
                        <div className='h-4 w-full'>
                            <button className='cursor-pointer px-4 py-2 w-full bg-blue-500'>Add Colleeborator</button>
                        </div>
                    </div>
                </div>

            )}

        </main>
    )
}

export default project