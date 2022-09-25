import { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import "@fullcalendar/common/main.css";
import { RiQuestionFill } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PencilIcon } from "@heroicons/react/outline";
import { updateAvailability } from '../../lib/fetching/dashboard';

function Availability({userId, viewingUserId, availability, onRefresh}){
    let intDays
    if (availability) {
        const availabilityDateMs = new Date(availability).getTime()
        const currentDateMs = new Date().getTime()
        const timezoneMs = new Date().getTimezoneOffset() * 60 * 1000
        const days = (availabilityDateMs - currentDateMs + timezoneMs) / (1000 * 60 * 60 * 24)
        intDays = (days > parseInt(days)) ? parseInt(days) + 1 : parseInt(days)
    }

    if (userId == viewingUserId) {
        const [showModal, setShowModal] = useState(false)
        const [availabilityDate, setAvailabilityDate] = useState(null)

        const infoAvailability = () => {
            toast.info('In case you are in a project, select the date it ends and click on Save. Otherwise, click on Cancel.', {
            toastId: "info-availability",
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
        }
        
        const handleOnSubmit = async (e) => {
            setShowModal(false)
            if (availabilityDate) {
                const res = await updateAvailability({user_id: userId, availability: availabilityDate})
                if (res.ok) {
                    onRefresh()
                }
            }
        }

        const handleOnClose = (e) => {
            setShowModal(false)
            setAvailabilityDate(null)
        }

        const handleDateClick = (arg) => {
            setAvailabilityDate(arg.dateStr)
        }

        return (
            <>
                <div className='h-full w-1/3 flex flex-col rounded-xl shadow-md bg-white'>
                    <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center justify-between border-b-2 border-solid border-gray-200">
                        <h2 className="font-semibold text-xs md:text-base leading-tight">Availability</h2>
                        <button className='w-4 md:w-6 h-4 md:h-6 p-[0.15rem] md:p-[0.2rem] text-black rounded-md hover:bg-gray-200' onClick={() => setShowModal(true)}>
                            <PencilIcon/>
                        </button>
                    </div>
                    <div className="w-full p-2 md:p-4 grow flex flex-row items-center justify-center">
                        
                            {intDays && intDays>0 ? (
                                <div className="w-full h-full px-2 bg-clueless-blue rounded-lg shadow-md flex items-center justify-center">
                                    <p className="font-light text-xs sm:text-sm md:text-base text-center text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                                        Available in <b>{intDays}</b> days
                                    </p>
                                </div>
                            ) : (
                                <div className="w-full h-full px-2 bg-green-400 rounded-lg shadow-md flex items-center justify-center">
                                    <p className="font-light text-sm sm:text-base md:text-lg text-center text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                                        Available
                                    </p>
                                </div>
                            )}
                    </div>
                </div>

                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <ToastContainer/>
                                <div className="flex items-center justify-between p-3 lg:p-4 border-b-2 border-solid border-gray-200 rounded-t">
                                    <h3 className="text-base md:text-lg lg:text-xl text-black font-semibold">
                                        Availability 
                                    </h3>
                                    <RiQuestionFill className='h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-gray-600' onMouseOver={() => infoAvailability()}/>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleOnSubmit}>
                                    <div className="flex p-4 lg:p-6">
                                        <FullCalendar
                                            plugins={[ dayGridPlugin, interactionPlugin ]}
                                            dateClick={handleDateClick}
                                            selectable
                                        />
                                    </div> 
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-4 lg:p-6 border-t-2 border-solid border-gray-200 rounded-b">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 outline-none focus:outline-none mr-2 lg:mr-3 ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base">
                                            Save
                                        </button>
                                        <button
                                            className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base"
                                            onClick={handleOnClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>     
                                </form>
                                
                                
                            </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : (
                    <>
                    </>
                )}
            </>
        )
    }

    return (
        <div className='h-full w-1/3 flex flex-col rounded-xl shadow-md bg-white'>
            <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center justify-between border-b-2 border-solid border-gray-200">
                <h2 className="font-semibold text-xs md:text-base leading-tight">Availability</h2>
            </div>
            <div className="w-full p-2 md:p-4 grow flex flex-row items-center justify-center">
                
                    {intDays && intDays>0 ? (
                        <div className="w-full h-full px-2 bg-clueless-blue rounded-lg shadow-md flex items-center justify-center">
                            <p className="font-light text-xs sm:text-sm md:text-base text-center text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                                Available in <b>{intDays}</b> days
                            </p>
                        </div>
                    ) : (
                        <div className="w-full h-full px-2 bg-green-400 rounded-lg shadow-md flex items-center justify-center">
                            <p className="font-light text-sm sm:text-base md:text-lg text-center text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                                Available
                            </p>
                        </div>
                    )}
            </div>
        </div>
    )
    
}

export default Availability