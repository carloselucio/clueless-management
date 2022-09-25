import React from "react";
import undefinedPic from '../../public/images/u/undefined.png';
import Image from 'next/image';
import {FaCheck, FaTimes} from "react-icons/fa";
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Application = ({application, jobOffer, updateStatus}) => {
   const offerSkills = jobOffer.jobOffer_skills;
   const userSkills = application.user.dashboard.dashboard_skills;

   const matching = offerSkills.filter((offer_skills) => userSkills.some( user_skills => user_skills.skill.name === offer_skills.skill.name ));

   const percent = Math.trunc((matching.length / offerSkills.length) * 100);
   
   const [showRejectModal, setShowRejectModal] = useState(false);
   const [showAcceptModal, setShowAcceptModal] = useState(false);

   const accept = (appId) => {
      const status="ACCEPTED";
      updateStatus(appId, status);
      setShowAcceptModal(false);
      result();
   };

  const reject = (appId) => {
      const status="REJECTED";
      updateStatus(appId, status);
      setShowRejectModal(false);
      result();
   };

   const result = () => {
      toast.info('The result will be notified to the applicant', {
         toastId: "result1",
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
      });
   }

   const setDate = (date) => {
      const splitDate = new Date(date).toUTCString().split(" ")
      return splitDate[1] + " " + splitDate[2] + " " + splitDate[3]
   }

   return (
      <div className="p-4 px-5 mb-3 bg-white shadow-md rounded-xl text-black border-2 border-white">
         <div className="flex justify-between flex-wrap">
            <div className="inline-flex flex-wrap">
               <div className="w-20 mt-2 ml-4 mr-5">
                  {application.user.image ? (
                     <img className="rounded-full" src={application.user.image} width="100%" height="100%" alt="Profile picture"/>
                  ) : (
                     <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
                  )}
               </div>
               <div>
                  <h1 className="font-semibold text-lg mt-2">{application.user.name}</h1>
                  <span className="font-semibold mb-2 px-3 mr-1 bg-blue-100 text-clueless-blue rounded-md text-sm">{percent}%</span><span className="font-thin text-sm">Skill compatability</span>
                  <h1 className="text-gray-500 text-sm mt-1"> Selected Date: {setDate(application.date)}</h1>
               </div>
            </div>

            {application.status == "PENDING" ? 
               <div className="inline-flex items-center my-2 bg-gray-100 p-4 rounded-lg">
                  <FaCheck onClick={() => setShowAcceptModal(true)} className="text-4xl ml-5 mr-5 text-green-500 hover:cursor-pointer hover:text-green-600"/>
                  {showAcceptModal ? (
                              <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[18rem] my-6 mx-auto">
                                    <div className="rounded-md shadow-md relative flex flex-col w-full bg-white">                                      
                                      <div className="flex items-center p-4 border-b-2 border-gray-200">
                                          <h3 className="text-2xl font-bold text-black">Accept application</h3>
                                      </div>
                                      <div className="container items-center">
                                          <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">If you accept this application the corresponding user will be notify with the change.</h1>
                                          <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">This action is irreversible.</h1>  
                                      </div>
                                      <div className="flex items-center justify-center p-4 border-t-2 border-gray-200">
                                          <button className="bg-blue-500 text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md mr-4" type="button" onClick={() => accept(application.application_id)}>Confirm</button>                        
                                          <button className="bg-wizeline-red text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md" type="button" onClick={() => setShowAcceptModal(false)}>Cancel</button>
                                      </div>
                                    </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                  ) : null}
                  <FaTimes onClick={() => setShowRejectModal(true)} className="text-4xl font-bold mr-5 text-red-500 hover:cursor-pointer hover:text-red-600"/>
                  {showRejectModal ? (
                              <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[18rem] my-6 mx-auto">
                                    <div className="rounded-md shadow-md relative flex flex-col w-full bg-white">                                      
                                      <div className="flex items-center p-4 border-b-2 border-gray-200">
                                          <h3 className="text-2xl font-bold text-black">Reject application</h3>
                                      </div>
                                      <div className="container items-center">
                                          <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">If you reject this application the corresponding user will be notify with the change.</h1>
                                          <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">This action is irreversible.</h1>  
                                      </div>
                                      <div className="flex items-center justify-center p-4 border-t-2 border-gray-200">
                                          <button className="bg-blue-500 text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md mr-4" type="button" onClick={() => reject(application.application_id)}>Confirm</button>                        
                                          <button className="bg-wizeline-red text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md" type="button" onClick={() => setShowRejectModal(false)}>Cancel</button>
                                      </div>
                                    </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                  ) : null}
               </div>
            : 
               <div className="inline-flex items-center my-2 bg-gray-100 p-4 rounded-lg">
                  <h1 className="font-semibold text-lg">{application.status}</h1>
               </div>
            }
         </div>
      </div> 
   );
};

export default Application;