import React from "react";
import {IoIosArrowDropdownCircle, IoMdSettings} from "react-icons/io";
import {RiLogoutBoxFill} from "react-icons/ri";
import {AiFillEdit} from "react-icons/ai";

function DropDownMenu() {
    const [showConfigModal, setShowConfigModal] = React.useState(false);

    return (
        <div className="dropdown inline-block relative self-center">
            <button className="text-white hover:text-gray-200 inline-flex items-center" type="button">
                <IoIosArrowDropdownCircle className="text-base sm:text-lg lg:text-xl mt-2"/> 
            </button>
            <ul className="dropdown-menu absolute hidden text-black pt-4 w-48">

                <li className=""><a className="border-b-2 bg-white hover:bg-gray-200 py-2 px-4 shadow-lg text-sm font-semibold flex items-center cursor-pointer" onClick={() => setShowConfigModal(true)}><IoMdSettings className="mr-2 text-lg text-gray-500"/>Configuration</a></li>

                {showConfigModal ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
                    <div className="relative w-[18rem] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-center p-4 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold">
                            Configuration 
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowConfigModal(false)}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>
                        
                        {/*body*/}
                        <div className="flex items-center justify-center mb-3 pt-4 border-t border-solid border-gray-200">
                        <button
                            className="bg-blue-500 text-white font-bold text-sm px-6 py-2 rounded-md shadow-sm hover:bg-blue-600 w-3/4"
                            type="button"
                            onClick={() => setShowConfigModal(false)}
                        >
                            Terms & Privacy
                        </button>
                        </div>
                        <div className="flex items-center justify-center mb-3">
                        <button
                            className="bg-blue-500 text-white font-bold text-sm px-6 py-2 rounded-md shadow-sm hover:bg-blue-600 w-3/4"
                            type="button"
                            onClick={() => setShowConfigModal(false)}
                        >
                            Change Password
                        </button>
                        </div>
                        <div className="flex items-center justify-center mb-4">
                        <button
                            className="bg-blue-500 text-white font-bold text-sm px-6 py-2 rounded-md shadow-sm hover:bg-blue-600 w-3/4"
                            type="button"
                            onClick={() => setShowConfigModal(false)}
                        >
                            Delete Account
                        </button>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-center p-4 border-t-2 border-solid border-gray-200 rounded-b">
                        
                        <button
                            className="bg-clueless-blue text-white font-bold text-sm px-6 py-2 rounded-md shadow-sm hover:bg-blue-600"
                            type="button"
                            onClick={() => setShowConfigModal(false)}
                        >
                            Close
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
                </>
            ) : null} 
            
                <li className=""><a className="rounded-b bg-white hover:bg-gray-200 py-2 px-4 shadow-lg text-sm font-semibold flex items-center" href="../api/auth/signout"><RiLogoutBoxFill className="mr-2 text-lg text-gray-500"/>Log out</a></li>
            </ul>
        </div>
        
    )
}

export default DropDownMenu