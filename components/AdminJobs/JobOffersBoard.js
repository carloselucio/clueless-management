import React from "react";
import {VscTrash} from "react-icons/vsc"; 
import {MdOutlineEdit} from "react-icons/md"; 
import { useEffect, useState } from 'react';
import { deleteJob } from "../../lib/fetching/jobs";

function JobOffersBoard({jobOffers, jobOfferSelected, setjobOfferSelected, setData, setShowModal, onSave}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [jobDeleted, setJobDeleted] = useState()

    const setDate = (date) => {
        const splitDate = date.split('-');
    
        const auxDate = new Date();
        auxDate.setMonth(parseInt(splitDate[1]) - 1);
    
        return splitDate[0] + " " + auxDate.toLocaleString('en-US', {
           month: 'short',
        });
    }

    const confirmDelete = () => {
        deleteJob(jobDeleted).then(() => {onSave()});
        setShowDeleteModal(false);
        return;
    };
   
    return (
        <>
            {jobOffers.map(job => (
                <div key={job.job_id} className={"p-4 px-5 mb-3 bg-white shadow-md rounded-xl text-gray-900 border-4 border-gray-100 " + ((jobOfferSelected ? jobOfferSelected.job_id : "") == job.job_id ? 'border-gray-400' : 'border-white')}>
                    <div onClick={() => setjobOfferSelected(job)} className="cursor-pointer flex justify-between items-center rounded-lg hover:bg-gray-100">
                        <h1 className="font-bold text-2xl mb-1">{job.position}</h1> 
                        <h1 className="bg-gray-100 px-3 rounded-md font-bold">{job.applications.length}</h1>
                    </div>
                    <div className="mt-1 mb-2 flex flex-wrap">
                        {
                        job.jobOffer_skills ? job.jobOffer_skills.map((offer_skills) =>
                            <span key={offer_skills.skill.skill_id} className="font-semibold mb-2 px-3 mr-2 bg-blue-100 text-clueless-blue rounded-md text-sm">{offer_skills.skill.name}</span>) : ''
                        }
                    </div>
                    <div className="flex flex-wrap items-center text-gray-500">
                        <h1 className="text-sm mr-2"><b>Duration:</b> &nbsp;{setDate(job.start_date)}  -</h1> 
                        <h1 className="text-sm mr-2">{setDate(job.end_date)} </h1> 
                        <div className="ml-auto text font-bold inline-flex items-center">
                        <MdOutlineEdit onClick={() => { setData(job); setShowModal(true);}} className="hover:cursor-pointer hover:text-gray-900 mr-2 text-gray-00"/>
                        <VscTrash onClick={() => {setShowDeleteModal(true); setJobDeleted(job.job_id)}} className="hover:cursor-pointer hover:text-red-900 text-red-600"/>
                        {showDeleteModal ? (
                              <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-[18rem] my-6 mx-auto">
                                    <div className="rounded-md shadow-md relative flex flex-col w-full bg-white">                                      
                                      <div className="flex items-center p-4 border-b-2 border-gray-200">
                                          <h3 className="text-2xl font-bold text-black">Delete task</h3>
                                      </div>
                                      <div className="container items-center">
                                          <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">If you delete this task all the applications corresponding to this task will also be erased.</h1>
                                          <h1 className="text-sm text-justify text-black px-5 py-3 font-semibold">This action is irreversible.</h1>  
                                      </div>
                                      <div className="flex items-center justify-center p-4 border-t-2 border-gray-200">
                                          <button className="bg-blue-500 text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md mr-4" type="button" onClick={() => confirmDelete()}>Confirm</button>                        
                                          <button className="bg-clueless-blue text-white hover:bg-blue-600 font-bold text-sm py-2 px-6 rounded-md" type="button" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                      </div>
                                    </div>
                                </div>
                              </div>
                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                              </>
                        ) : null}
                        </div>
                    </div>
                </div> 
            ))}
        </>
    );
};

export default JobOffersBoard;