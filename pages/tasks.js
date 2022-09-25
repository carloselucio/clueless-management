import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BsFillCaretRightFill } from "react-icons/bs";
import JobBoardComponent from '../components/Jobs/JobBoardComponent';
import ApplicationBoard from "../components/Jobs/ApplicationBoard";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/Jobs/SearchBar.js";
import Pagination from "../components/Jobs/Pagination";
import { getJobs, getApplications, createApplication } from "../lib/fetching/jobs"
import { getSkills } from "../lib/fetching/skills"

// This page is the job page where a user can search and apply to jobs.

function Jobs({ renderData }) {
  const { data: session } = useSession();
  let sessionDataToLayout = null;
  const router = useRouter();

  async function refreshData(){
    router.replace(router.asPath, undefined, { scroll: false });
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

  const applications = renderData.applicationsData;
  const jobs = renderData.jobsData;
  const skills = renderData.skillsData;

  const [filterSkills, setFilterSkills] = useState([]);
  const [filterContracts, setFilterContracts] = useState([]);
  const [filterLocations, setFilterLocations] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  const contracts = [...new Set(jobs.map(job => job.contract))];
  const locations = [...new Set(jobs.map(job => job.location))];

  const filterBySkills = ({jobOffer_skills}) => {
    function includes(s) {
      let match = false;
      for(let i = 0; i < jobOffer_skills.length; i++) {
        if (jobOffer_skills[i].skill.name == s) {
          match = true;
        }
      }
      return match;
    }

    if(filterSkills.length === 0) {
      return true;
    }

    return filterSkills.every(skill => includes(skill));
  };

  const filterByContracts = (job) => {
    if(filterContracts.length === 0) {
      return true;
    }
    return filterContracts.some(c => c === job.contract ? true : false);
  };

  const filterByLocation = (job) => {
    if(filterLocations.length === 0) {
      return true;
    }
    return filterLocations.some(l => l === job.location ? true : false);
  };

  const handleSkillClick = (skill) => {
    if (filterSkills.includes(skill.name)) return;
    setFilterSkills([...filterSkills, skill.name]);
  };

  const handleContractClick = (contract) => {
    if (filterContracts.includes(contract)) return;
    setFilterContracts([...filterContracts, contract]);
  };

  const handleLocationClick = (location) => {
    if (filterLocations.includes(location)) return;
    setFilterLocations([...filterLocations, location]);
  };

  const handleFilterSkillClick = (passedFilter) => {
    setFilterSkills(filterSkills.filter((f) => f !== passedFilter));
  };

  const handleFilterContractClick = (passedFilter) => {
    setFilterContracts(filterContracts.filter((f) => f !== passedFilter));
  };

  const handleFilterLocationClick = (passedFilter) => {
    setFilterLocations(filterLocations.filter((f) => f !== passedFilter));
  };

  const clearFilters = () => {
    setFilterSkills([]);
    setFilterContracts([]);
    setFilterLocations([]);
  }
  const filteredJobsbySkills = jobs.filter(filterBySkills);
  const filteredJobsbySkillsContracts = filteredJobsbySkills.filter(filterByContracts);
  const filteredJobsbySkillsContractsLocation = filteredJobsbySkillsContracts.filter(filterByLocation);

  // FUNCIONALIDAD DE APPLICATIONS
  const handleApplyNow = (job) => {
    for (const application in applications) {
      if (applications[application].job_id === job.job_id) return false;
    }
    return true;
  };
  
  const handleConfirm = async (job) => {
    const res = await createApplication({user_id: session.user.id, job_id: job.job_id});
    if(res.ok){
      refreshData();
    }
  };

  const eraseApplication = (application) => {
    if (application.status === "PENDING") {
      return true;
    }
    //setApplications(applications.filter((f) => f !== application));
    return false;
  };

  // PAGINATION
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobsbySkillsContractsLocation.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <>
      <ToastContainer/>
      <Layout sessionData={sessionDataToLayout} viewingUser={session ? {id: session.user.id, name: session.user.name, image: session.user.image} : null}>
        <div className="m-auto content-center h-full w-full">
          <div className="columns-2 flex">
            <div className="w-1/3 text-gray-900">
              {session ? (
                <div className="mb-4 bg-white rounded-xl shadow-md">
                  <div className="px-2 mx-2 py-3">
                    <details className="group mb-4 rounded-md bg-white border-b-2 border-gray-500">
                      <summary className="relative flex cursor-pointer flex-wrap items-center rounded group-open:z-[1] group-open:rounded-b-none">
                        <h3 className="flex flex-1 p-4 pr-0 text-sm sm:text-base md:text-lg lg:text-xl font-thin">My tasks</h3>
                        <div className="flex w-auto items-center justify-center">
                          <div className="ml-2 origin-left transition-transform group-open:rotate-90 mt-2 mr-3 text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl"><BsFillCaretRightFill/></div>
                        </div>
                      </summary>
                      <div className="p-1 m-1 mt-0 text-sm">
                        {
                          applications.length === 0 ? (
                            <div className="rounded-md bg-gray-200 p-2 my-2"><h1 className="font-semibold">No current applications.</h1></div>
                          ) : (
                              applications.map((application) =>
                              <ApplicationBoard user_id={session.user.id} application={application} onSave={() => refreshData()} key={application.application_id} eraseApplication={eraseApplication} />
                              )
                            )
                        }
                      </div>
                    </details>
                  </div>
                </div>
              ) : (
                <></>
              )}
             <div className="bg-white rounded-xl shadow-md">
                 <br></br>
                 <h1 className="mx-5 text-sm sm:text-base md:text-lg lg:text-xl font-thin">What are you looking for?</h1>
                 <div className="flex flex-wrap bg-white border-2 border-solid border-gray-500 rounded-md p-4 m-4 pb-2 mt-2 shadow-sm">
                   {
                     filterSkills.length > 0 && filterSkills.map((skill) => 
                       <span
                         key={skill}
                         onClick={() => handleFilterSkillClick(skill)} 
                         className="cursor-pointer font-semibold px-3 mr-2 mb-2 bg-blue-100 text-clueless-blue rounded-md text-sm">
                         {skill}
                         <span className="text-red-400"> ×</span>
                       </span>)
                   }
                   <button onClick={clearFilters} className="font-bold text-gray-600 ml-auto bg-gray-100 px-3 mb-2 rounded-md text-sm hover:bg-gray-200">Clear</button>
                 </div>
                 <div className="px-2 mx-2 mt-0">
                   <details className="group mb-4 rounded-md bg-white border-b-2 border-gray-500">
                     <summary className="relative flex cursor-pointer flex-wrap items-center rounded group-open:z-[1] group-open:rounded-b-none">
                       <h3 className="flex flex-1 p-4 pr-0 text-sm sm:text-base md:text-lg lg:text-xl font-thin">Skills</h3>
                       <div className="flex w-auto items-center justify-center">
                         <div className="ml-2 origin-left transition-transform group-open:rotate-90 mt-2 mr-3 text-gray-900 text-sm sm:text-base md:text-lg lg:text-xl"><BsFillCaretRightFill/></div>
                       </div>
                     </summary>
                     <div className="flex flex-wrap p-1 m-1 mt-0 text-sm">
                       <SearchBar placeholder="Enter a Skill Name..." data={skills} handleSkillClick={handleSkillClick}/>
                     </div>
                   </details>
                 </div>
               <br></br>
             </div>
          </div>

          <div className="w-2/3">
            {jobs.length === 0 ? (
              <>
                <div className="p-4 px-5 ml-4 mb-4 bg-white shadow-md rounded-xl text-gray-900">
                  <p className="font-semibold text-lg">No Job Offers!</p>
                </div>
              </>
              
            ) : (
              currentJobs.map((job) => <JobBoardComponent userId={session ? session.user.id : null} job={job} key={job.job_id} handleApplyNow={session ? handleApplyNow : null} handleConfirm={session ? handleConfirm: null}/>)
            )}
          </div>

          </div>
          <div className="flex justify-center m-4 mb-0">
            <Pagination jobsPerPage={jobsPerPage} totalJobs={filteredJobsbySkillsContractsLocation.length} paginate={paginate} currentPage={currentPage}/>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context)
  
  const jobsRes = await getJobs()
  const skillsRes = await getSkills()

  if (jobsRes.ok) { 
    if (skillsRes.ok) {
      const jobs = await jobsRes.json()
      const skills = await skillsRes.json()

      if (session) {
        const headers = context.req.headers;
        const applicationsRes = await getApplications(session.user.id, headers.cookie)

        if (applicationsRes.ok){  
          const applications = await applicationsRes.json()
          // si el HTTP-status es 200-299
          // obtener cuerpo de la respuesta (método debajo)

          return {
            props: {
              session: session,
              renderData: {
                jobsData: jobs,
                skillsData: skills,
                applicationsData: applications
              }
            }
          }

        } else {
          throw new Error(applicationsRes.statusText);
        }

      } 

      return {
        props: {
          renderData: {
            jobsData: jobs,
            skillsData: skills
          }
        }
      } 

    } else {
      throw new Error(skillsRes.statusText);
    }
  } else {
    throw new Error(jobsRes.statusText);
  }
}

export default Jobs
