import React from "react";
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobBoardComponent = ({userId, job, handleApplyNow, handleConfirm}) => {

   const setDate = (date) => {
      const splitDate = date.split('-');

      const auxDate = new Date();
      auxDate.setMonth(parseInt(splitDate[1]) - 1);

      return splitDate[0] + " " + auxDate.toLocaleString('en-US', {
         month: 'short',
      });
   }
   
   if (userId) {
      const [showModal, setShowModal] = useState(false);

      const errorApplyNow = () => {
         toast.error('You have already applied to this task!', {
            toastId: "error1",
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
         });
      }

      const successApplyNow = () => {
         toast.success('You have applied. Wait for the answer.', {
            toastId: "error1",
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
         });
      }

      const confirmButton = (jobApplication) => {
         setShowModal(false);
         handleConfirm(jobApplication);
         successApplyNow();
      };

      return (
         <>
            <div className="p-4 px-5 ml-4 mb-4 bg-white shadow-md rounded-xl text-gray-900">
               <div>
                  <h1 className="font-bold text-lg sm:text-2xl md:text-3xl">{job.position}</h1> 
               </div>
               <div className="mb-2 mt-1 flex flex-wrap">
                  {
                     job.jobOffer_skills ? job.jobOffer_skills.map((offer_skills) =>
                        <span key={offer_skills.skill.name} className="font-semibold mb-2 px-3 mr-2 bg-blue-100 text-clueless-blue rounded-md text-xs md:text-sm">{offer_skills.skill.name}</span>) : ''
                  }
               </div>
               <div className="mb-2">
                  <h1 className="text-xs sm:text-sm md:text-base text-justify">{job.description}</h1> 
               </div>
               <div className="flex text-gray-500">
                  <h1 className="text-xs sm:text-sm md:text-base"><b>Duration:</b> &nbsp;{setDate(job.start_date)} -&nbsp;</h1>
                  <h1 className="text-xs sm:text-sm md:text-base">{setDate(job.end_date)}</h1>
                  <button onClick={() => handleApplyNow(job) ? setShowModal(true) : errorApplyNow()}
                  className="font-bold text-gray-600 ml-auto bg-gray-100 px-3 rounded-md text-xs md:text-sm hover:bg-gray-200">Assign Me
                  </button>
               </div>
            </div>
   
            {showModal ? (
               <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-[18rem] my-6 mx-auto">
                     {/*content*/}
                     <div className="rounded-md shadow-md relative flex flex-col w-full bg-white">
                        
                        {/*header*/}
                        <div className="flex items-center p-4 border-b-2 border-gray-200">
                           <h3 className="text-2xl font-bold text-black">Please Confirm</h3>
                        </div>
                        
                        {/*body*/}
                        <div className="container items-center">
                           <h1 className="text-sm text-justify text-black px-5 py-3">If you select this task you will be reviewed by your current dashboard and portfolio. Make sure every area of your account is up to date. Once you confirm you will be able to see the state of your request on your Tasks window.</h1> 
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-center p-4 border-t-2 border-gray-200">
                           <button
                           className="bg-blue-500 text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md mr-4"
                           type="button"
                           onClick={(e) => {
                              e.preventDefault()
                              confirmButton(job);
                           } }
                           >
                           Confirm
                           </button>                        
                           <button
                           className="bg-clueless-blue text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md"
                           type="button"
                           onClick={() => setShowModal(false)}
                           >
                           Cancel
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
               </>
               ) : null
            }
         </>
      )
   }

   return (
      <div className="p-4 px-5 ml-4 mb-4 bg-white shadow-md rounded-xl text-gray-900">
         <div>
            <h1 className="font-bold text-lg sm:text-2xl md:text-3xl">{job.position}</h1> 
         </div>
         <div className="mb-2 mt-1 flex flex-wrap">
            {
               job.jobOffer_skills ? job.jobOffer_skills.map((offer_skills) =>
                  <span key={offer_skills.skill.name} className="font-semibold mb-2 px-3 mr-2 bg-red-100 text-red-600 rounded-md text-xs md:text-sm">{offer_skills.skill.name}</span>) : ''
            }
         </div>
         <div className="mb-2">
            <h1 className="text-xs sm:text-sm md:text-base text-justify">{job.description}</h1> 
         </div>
         <div className="flex text-gray-500">
            <h1 className="text-xs sm:text-sm md:text-base"><b>Duration:</b> &nbsp;{setDate(job.start_date)} -</h1>
            <h1 className="text-xs sm:text-sm md:text-base">{setDate(job.end_date)}</h1>
         </div>
      </div>
   )
};

export default JobBoardComponent;