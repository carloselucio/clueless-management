import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useState } from "react";
import{VscTrash, VscTriangleRight} from "react-icons/vsc"; 
import{IoMdBriefcase} from "react-icons/io";
import {AiOutlinePlus, AiFillRocket} from "react-icons/ai";
import {FaGraduationCap} from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import ModalExperience from "../../components/Experience/ModalExperience";
import ErrorContainer from "../../components/Templates/ErrorContainer";
import { getExperiences, deleteExperience } from "../../lib/fetching/experiences"

// This page creates the portfolio of experiences of each user.

function Experience({ query, renderData }) {
  const { data: session, status } = useSession();
  const ExperienceUser = query.user_id;
  let sessionDataToLayout = null;
  const router = useRouter();

  async function refreshData(){
    router.replace(router.asPath, undefined, { scroll: false });
  };
  // "bg-emerald-500 active:bg-emerald-600 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-xl text-white font-bold"
  
  const sortedExperiences = renderData.experiences.sort((a, b) => b.start_date - a.start_date);
  const jobs = sortedExperiences.filter((exp) => exp.type === "JOB");
  const projects = sortedExperiences.filter((exp) => exp.type === "PERSONAL_PROJECT");
  const education = sortedExperiences.filter((exp) => exp.type === "EDUCATION");

  if (session) {
    sessionDataToLayout = {
      id: session.user.id,
      image: session.user.image,
      name: session.user.name,
      occupation: session.user.occupation,
      role: session.user.role,
    }
  }
  
  if (session && session.user.id == ExperienceUser) {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(null);

    // This is editable returned page
    return (
      <Layout sessionData={sessionDataToLayout} viewingUser={{id: renderData.id, name: renderData.name, image: renderData.image}}>
        <ModalExperience show={showModal} onClose={() => setShowModal(false)} onSave={() => refreshData()} data={data} user_id={session.user.id}/>

        <div className="bg-white rounded-xl w-full mb-5 text-center shadow-md">
          <button className="bg-clueless-blue hover:bg-blue-600 px-5 py-2 font-bold rounded-xl inline-flex items-center text-white w-full text-center" onClick={() => {setData(null), setShowModal(true)}}>
          <AiOutlinePlus className="mr-2"/>
          Add Experience
          </button>
        </div>

        <div className="bg-white rounded-xl w-full mb-5 p-10 pt-5 shadow-md">
          <h1 className="font-bold text-3xl text-black p-5 inline-flex">PAST JOBS
            <IoMdBriefcase className="ml-4 mt-1"/>
          </h1>
          {jobs.length === 0 ? (
            <div className="block bg-gray-100 shadow p-5 px-10 mx-10 rounded-xl font-semibold w-11/12">
              <h2 className="text-lg">Your space is empty! Click on: + Add Experience.</h2>
            </div>
          ) : (
            <div className="relative wrap overflow-hidden py-15 px-10 mx-10 h-full w-11/12">
              <div className="w-2 -ml-3 absolute bg-gray-400 h-full rounded-full"/>

              {jobs.map((experience, i) => (
                <div key={experience.experience_id}
                className="flex flex-row bg-gray-100 shadow-md hover:shadow-lg cursor-pointer w-full px-7 py-6 my-3 ml-2 justify-start items-center rounded-xl"
                onClick={() => {
                  setData(experience);
                  setShowModal(true);
                }}
                >
                  <span className="-ml-14 text-gray-400 text-4xl "><VscTriangleRight/></span>
                  <span className="whitespace-nowrap ml-3 mr-6 text-base sm:text-lg md:text-2xl lg:text-3xl justify-start font-thin text-blue-600">{(experience.start_date != experience.end_date) ? (experience.start_date.toString() + " - " + experience.end_date.toString()) : experience.start_date.toString()}</span>
                  <div className="flex grow flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl">{experience.name}</h1>
                      <button 
                      className="hover:text-red-900 rounded-xl inline-flex items-center text-clueless-blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExperience(session.user.id, experience.experience_id).then(() => {refreshData()});
                      }}
                      ><VscTrash className="w-5 h-5"/></button>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base mt-3 text-justify">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
            )
          }
        </div>

        <div className="bg-white rounded-xl w-full mb-5 p-10 pt-5 shadow-md">
          <h1 className="font-bold text-3xl text-black p-5 inline-flex">PAST PROJECTS
            <AiFillRocket className="ml-4 mt-1"/>
          </h1>
          {projects.length === 0 ? (
            <div className="block bg-gray-100 shadow p-5 px-10 mx-10 rounded-xl font-semibold w-11/12">
              <h2 className="text-lg">Your space is empty! Click on: + Add Experience.</h2>
            </div>
          ) : (
            <div className="relative wrap overflow-hidden py-15 px-10 mx-10 h-full w-11/12">
              <div className="w-2 -ml-3 absolute bg-gray-400 h-full rounded-full"/>

              {projects.map((experience, i) => (
                <div key={experience.experience_id}
                className="flex flex-row bg-gray-100 shadow-md hover:shadow-lg cursor-pointer w-full px-7 py-6 my-3 ml-2 justify-start items-center rounded-xl"
                onClick={() => {
                  setData(experience);
                  setShowModal(true);
                }}
                >
                  <span className="-ml-14 text-gray-400 text-4xl "><VscTriangleRight/></span>
                  <span className="whitespace-nowrap ml-3 mr-6 text-base sm:text-lg md:text-2xl lg:text-3xl justify-start font-thin text-blue-600">{(experience.start_date != experience.end_date) ? (experience.start_date.toString() + " - " + experience.end_date.toString()) : experience.start_date.toString()}</span>
                  <div className="flex grow flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl">{experience.name}</h1>
                      <button 
                      className="hover:text-red-900 rounded-xl inline-flex items-center text-clueless-blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExperience(session.user.id, experience.experience_id).then(() => {refreshData()});
                      }}
                      ><VscTrash className="w-5 h-5"/></button>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base mt-3 text-justify">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
            )
          }
        </div>

        <div className="bg-white rounded-xl w-full mb-10 p-10 pt-5 shadow-md">
          <h1 className="font-bold text-3xl text-black p-5 inline-flex">EDUCATION & CERTIFICATES
            <FaGraduationCap className="ml-4 mt-1"/>
          </h1>
          {education.length === 0 ? (
            <div className="block bg-gray-100 shadow p-5 px-10 mx-10 rounded-xl font-semibold w-11/12">
              <h2 className="text-lg">Your space is empty! Click on: + Add Experience.</h2>
            </div>
          ) : (
            <div className="relative wrap overflow-hidden py-15 px-10 mx-10 h-full w-11/12">
              <div className="w-2 -ml-3 absolute bg-gray-400 h-full rounded-full"/>

              {education.map((experience, i) => (
                <div key={experience.experience_id}
                className="flex flex-row bg-gray-100 shadow-md hover:shadow-lg cursor-pointer w-full px-7 py-6 my-3 ml-2 justify-start items-center rounded-xl"
                onClick={() => {
                  setData(experience);
                  setShowModal(true);
                }}
                >
                  <span className="-ml-14 text-gray-400 text-4xl "><VscTriangleRight/></span>
                  <span className="whitespace-nowrap ml-3 mr-6 text-base sm:text-lg md:text-2xl lg:text-3xl justify-start font-thin text-blue-600">{(experience.start_date != experience.end_date) ? (experience.start_date.toString() + " - " + experience.end_date.toString()) : experience.start_date.toString()}</span>
                  <div className="flex grow flex-col">
                    <div className="flex flex-row justify-between items-center">
                      <h1 className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl">{experience.name}</h1>
                      <button 
                      className="hover:text-red-900 rounded-xl inline-flex items-center text-clueless-blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteExperience(session.user.id, experience.experience_id).then(() => {refreshData()});
                      }}
                      ><VscTrash className="w-5 h-5"/></button>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base mt-3 text-justify">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
            )
          }
        </div>
      </Layout>
    );
  }

  if (renderData) {
    // This is only-view returned page
    return (
      <Layout sessionData={sessionDataToLayout} viewingUser={{id: renderData.id, name: renderData.name, image: renderData.image}}>

          <div className="bg-white rounded-xl w-full mb-5 p-10 pt-5 shadow-md">
            <h1 className="font-bold text-3xl text-black p-5 inline-flex">PAST JOBS
              <IoMdBriefcase className="ml-4 mt-1"/>
            </h1>
            {jobs.length === 0 ? (
              <div className="block bg-gray-100 shadow p-5 px-10 mx-10 rounded-xl font-semibold w-11/12">
                <h2 className="text-lg">The space is empty.</h2>
              </div>
            ) : (
              <div className="relative wrap overflow-hidden py-15 px-10 mx-10 h-full w-11/12">
                <div className="w-2 -ml-3 absolute bg-gray-400 h-full rounded-full"/>

                {jobs.map((experience, i) => (
                  <div key={experience.experience_id} className="flex flex-row bg-gray-100 shadow-md w-full px-7 py-6 my-3 ml-2 justify-start items-center rounded-xl">
                    <span className="-ml-14 text-gray-400 text-4xl "><VscTriangleRight/></span>
                    <span className="whitespace-nowrap ml-3 mr-6 text-base sm:text-lg md:text-2xl lg:text-3xl justify-start font-thin text-blue-600">{(experience.start_date != experience.end_date) ? (experience.start_date.toString() + " - " + experience.end_date.toString()) : experience.start_date.toString()}</span>
                    <div className="flex grow flex-col">
                      <div className="flex flex-row items-center">
                        <h1 className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl">{experience.name}</h1>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base mt-3 text-justify">{experience.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              )
            }
          </div>

          <div className="bg-white rounded-xl w-full mb-5 p-10 pt-5 shadow-md">
            <h1 className="font-bold text-3xl text-black p-5 inline-flex">PAST PROJECTS
              <AiFillRocket className="ml-4 mt-1"/>
            </h1>
            {projects.length === 0 ? (
              <div className="block bg-gray-100 shadow p-5 px-10 mx-10 rounded-xl font-semibold w-11/12">
                <h2 className="text-lg">The space is empty.</h2>
              </div>
            ) : (
              <div className="relative wrap overflow-hidden py-15 px-10 mx-10 h-full w-11/12">
                <div className="w-2 -ml-3 absolute bg-gray-400 h-full rounded-full"/>

                {projects.map((experience, i) => (
                  <div key={experience.experience_id} className="flex flex-row bg-gray-100 shadow-md w-full px-7 py-6 my-3 ml-2 justify-start items-center rounded-xl">
                    <span className="-ml-14 text-gray-400 text-4xl "><VscTriangleRight/></span>
                    <span className="whitespace-nowrap ml-3 mr-6 text-base sm:text-lg md:text-2xl lg:text-3xl justify-start font-thin text-blue-600">{(experience.start_date != experience.end_date) ? (experience.start_date.toString() + " - " + experience.end_date.toString()) : experience.start_date.toString()}</span>
                    <div className="flex grow flex-col">
                      <div className="flex flex-row items-center">
                        <h1 className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl">{experience.name}</h1>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base mt-3 text-justify">{experience.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              )
            }
          </div>

          <div className="bg-white rounded-xl w-full mb-5 p-10 pt-5 shadow-md">
            <h1 className="font-bold text-3xl text-black p-5 inline-flex">EDUCATION & CERTIFICATES
              <FaGraduationCap className="ml-4 mt-1"/>
            </h1>
            {education.length === 0 ? (
              <div className="block bg-gray-100 shadow p-5 px-10 mx-10 rounded-xl font-semibold w-11/12">
                <h2 className="text-lg">The space is empty.</h2>
              </div>
            ) : (
              <div className="relative wrap overflow-hidden py-15 px-10 mx-10 h-full w-11/12">
                <div className="w-2 -ml-3 absolute bg-gray-400 h-full rounded-full"/>

                {education.map((experience, i) => (
                  <div key={experience.experience_id} className="flex flex-row bg-gray-100 shadow-md w-full px-7 py-6 my-3 ml-2 justify-start items-center rounded-xl">
                    <span className="-ml-14 text-gray-400 text-4xl "><VscTriangleRight/></span>
                    <span className="whitespace-nowrap ml-3 mr-6 text-base sm:text-lg md:text-2xl lg:text-3xl justify-start font-thin text-blue-600">{(experience.start_date != experience.end_date) ? (experience.start_date.toString() + " - " + experience.end_date.toString()) : experience.start_date.toString()}</span>
                    <div className="flex grow flex-col">
                      <div className="flex flex-row items-center">
                        <h1 className="font-semibold text-xs sm:text-sm md:text-lg lg:text-xl">{experience.name}</h1>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base mt-3 text-justify">{experience.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              )
            }
          </div>
      </Layout>
    )
  } else {
    return (
      <Layout sessionData={sessionDataToLayout}>
          <ErrorContainer code={404} message={"Experiences not found."}/>
      </Layout>
    )
  }
}

function setYears(experiences){
  experiences.map(
    function(exp){
      exp["start_date"] = new Date(exp["start_date"]).getUTCFullYear().toString();
      exp["end_date"] = new Date(exp["end_date"]).getUTCFullYear().toString();
    }
  );
}

export const getServerSideProps = async (context) => {
  
  const session = await getSession(context)
  const res = await getExperiences(context.query.user_id)

  if (res.ok) { // si el HTTP-status es 200-299
    // obtener cuerpo de la respuesta (método debajo)
    let data = await res.json();
    setYears(data.experiences);

    if (session) {
      return {
        props: {
          session: session,
          query: context.query,
          renderData: data,
        },
      }
    }

    return {
      props: {
        query: context.query,
        renderData: data,
      }
    }
    
  } else {
    throw new Error(res.statusText);
  }
};

export default Experience