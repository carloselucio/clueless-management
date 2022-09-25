import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BsPlusLg } from "react-icons/bs";
import { MdHowToVote } from "react-icons/md";
import Layout from "../../components/Layout/Layout";
import Application from "../../components/AdminJobs/Application";
import JobOffersBoard from "../../components/AdminJobs/JobOffersBoard";
import ModalJobOffer from "../../components/AdminJobs/ModalJobOffer";
import ErrorContainer from "../../components/Templates/ErrorContainer";
import { getJobsWithApplications, updateApplicationStatus } from "../../lib/fetching/jobs";
import { getSkills } from "../../lib/fetching/skills";

function adminJobs({renderData}) {

    const { data: session } = useSession();
    let sessionDataToLayout = null;
    const router = useRouter();
  
    async function refreshData(){
        router.replace(router.asPath, undefined, { scroll: false });
        return
    };
    
    if (session) {
        sessionDataToLayout = {
            id: session.user.id,
            image: session.user.image,
            name: session.user.name,
            occupation: session.user.occupation,
            role: session.user.role,
        }
    }

    if (session && (session.user.role == "ADMIN" || session.user.role == "MASTER")) { // This is editable returned page

        const skills = renderData.skillsData;

        // Select the jobOffer to view user applications. (First offer by default)
        const [jobOfferSelected, setjobOfferSelected] = useState(
            (renderData.jobsData.length > 0) ? renderData.jobsData[0] : null
        )

        useEffect(()=>{
            const job = renderData.jobsData.filter(job => job.job_id == jobOfferSelected.job_id)[0];

            if(job){
                setjobOfferSelected(job);
            } else {
                setjobOfferSelected((renderData.jobsData.length > 0) ? renderData.jobsData[0] : null);
            }

        },[renderData.jobsData])

        const [showModal, setShowModal] = useState(false);
        const [data, setData] = useState(null);
        

        const updateStatus = (application_id, status) => {
            updateApplicationStatus(application_id, status).then(() => {refreshData();})
        }

        return (
            <>
            <ToastContainer/>
            <Layout sessionData={sessionDataToLayout} viewingUser={session ? {id: session.user.id, name: session.user.name, image: session.user.image}:null}>              
                <ModalJobOffer show={showModal} onClose={() => setShowModal(false)} data={data} skills={skills}/>  

                <div className="m-auto content-center h-full w-full">
                    <div className="columns-2 flex">
                        <div className="w-1/2 mr-4">
                            <button className="bg-clueless-blue hover:bg-blue-600 px-5 py-2 mb-4 font-bold rounded-xl inline-flex items-center text-white w-full text-center shadow-md text-md" 
                            onClick={() => {setData(null), setShowModal(true)}}>
                            <BsPlusLg className="text-sm mr-2"/>
                            Add Task
                            </button>
                            <JobOffersBoard jobOffers={renderData.jobsData} jobOfferSelected={jobOfferSelected} setjobOfferSelected={setjobOfferSelected} setData={setData} setShowModal={setShowModal} onSave={refreshData}/>

                        </div>
                        <div className="w-1/2 ml-4">
                            <div className="mb-4 bg-white rounded-xl shadow-md px-5 py-2 font-bold inline-flex items-center w-full text-gray-900 text-md">
                                <MdHowToVote className="text-xl mr-2"/>
                                <h1 className="text-md"> Manage Employee Requests</h1>
                            </div>
                            {(jobOfferSelected && jobOfferSelected.applications.length > 0) ? (
                                jobOfferSelected.applications.map((application) => <Application application={application} key={application.application_id} jobOffer={jobOfferSelected} updateStatus={updateStatus}/>)
                            ) : (
                                <div className="p-4 px-5 mb-3 bg-white shadow-md rounded-xl text-black border-2 border-white"><p className="font-semibold text-sm">No Applications Yet!</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
            </>
        )
    } else {
        return (
            <Layout sessionData={sessionDataToLayout}>
                <ErrorContainer code={401} message={"You are not authorized to use this function."}/>
            </Layout>
        )
    }
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    
    if(session){
        const headers = context.req.headers;
        const jobsRes = await getJobsWithApplications(headers.cookie)
        const skillsRes = await getSkills()

        if(jobsRes.ok){
            if(skillsRes.ok){

                const jobs = await jobsRes.json()
                const skills = await skillsRes.json()

                return {
                    props: {
                        session: await getSession(context),
                        renderData: {
                            jobsData: jobs,
                            skillsData: skills
                        }
                    },
                }

            } else{
                throw new Error(skillsRes.statusText);    
            }

        } else {
            throw new Error(jobsRes.statusText);
        }

    } else {
        return {
            props: {
                renderData: []
            }
        }
    }
}

export default adminJobs