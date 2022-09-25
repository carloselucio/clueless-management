import React from "react";
import { useState } from 'react';
import { deleteApplication } from "../../lib/fetching/jobs";
import{VscTrash} from "react-icons/vsc";

const ApplicationBoard = ({user_id, application, eraseApplication, onSave}) => {

  const [showModal, setShowModal] = useState(false);

  const setDate = (date) => {
    const splitDate = date.split('-');

    const auxDate = new Date();
    auxDate.setMonth(parseInt(splitDate[1]) - 1);

    return splitDate[0] + " " + auxDate.toLocaleString('en-US', {
       month: 'short',
    });

 }

  return (
    <div className="rounded-md bg-gray-200 p-2 my-2">
      <div className="w-full mb-1 flex justify-between">
        <h1 className="font-semibold text-xs sm:text-sm md:text-base">{application.jobOffer.position}</h1>
        {application.status == "PENDING" ? (
          <button onClick =
          {    
            () => eraseApplication(application) ? setShowModal(true) : setShowModal(false)
          }
          className="hover:text-red-900 rounded-xl font-bold inline-flex items-center text-blue-600"
          ><VscTrash/>
          </button>
        ) : (
          <></>
        )}
        {showModal ? (
        <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[18rem] my-6 mx-auto">
              {/*content*/}
              <div className="rounded-md shadow-md relative flex flex-col w-full bg-white">
                
                {/*header*/}
                <div className="flex items-center p-4 border-b-2 border-gray-200">
                    <h3 className="text-2xl font-bold text-black">Cancel application</h3>
                </div>
                
                {/*body*/}
                <div className="container items-center">
                    <h1 className="text-sm text-justify text-black px-5 py-3">Your application status is still in "Pending" if you click confirm you will cancel your application process.</h1>
                    <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">This action is irreversible.</h1>  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-4 border-t-2 border-gray-200">
                    <button
                    className="bg-blue-500 text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md mr-4"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteApplication(user_id, application.application_id).then(() => {onSave()});
                      setShowModal(false);
                    }}
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
        ) : null}
        </div>
        <div className="flex">
          <span className="text-xs sm:text-sm md:text-base">Status: {application.status.charAt(0) + application.status.toLowerCase().slice(1)}</span>
          <span className="text-xs sm:text-sm md:text-base ml-auto text-gray-500"> Applied Date: {setDate(application.date)}</span>
      </div>
    </div>
  );
};

export default ApplicationBoard;