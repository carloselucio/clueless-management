import { createSkill, deleteSkill } from "../../lib/fetching/dashboard"
import {
  PencilIcon, 
  EyeIcon
} from "@heroicons/react/outline";
import { VscTrash } from "react-icons/vsc"; 

import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'


function Skills({userId, viewingUserId, dashboardId, userSkills, skills, onRefresh}) {
  const [showModalSkills, setShowModalSkills] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedDeletedSkill, setSelectedDeletedSkill] = useState("")
  const [selectedAddedSkill, setSelectedAddedSkill] = useState("")
  const [selectedAddedLevel, setSelectedAddedLevel] = useState("")

  if (userId === viewingUserId) {
    
    const handleOnAdd = async (e) => {
      if (selectedAddedSkill.length > 0) {
        const res = await createSkill({user_id: userId, dashboard_id: dashboardId, skill_id: selectedAddedSkill, level: selectedAddedLevel})
        if (res.ok) {
          onRefresh()
        }
      }
      setSelectedAddedSkill("")
      setSelectedAddedLevel("")
    }

    const handleOnDelete = async (e) => {
      if (selectedDeletedSkill.length > 0) {
        const res = await deleteSkill({user_id: userId, dashboard_skill_id: selectedDeletedSkill})
        if (res.ok) {
          onRefresh()
        }
      }
      setSelectedDeletedSkill("")
    }

    const handleOnClose = (e) => {
      setShowModal(false)
      setSelectedAddedSkill("")
      setSelectedAddedLevel("")
      setSelectedDeletedSkill("")
    }

    return (
      <>
        <div className="h-[18rem] md:h-[24rem] lg:h-[30rem] w-full lg:w-1/3 flex flex-col rounded-xl shadow-md bg-white">
          <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center justify-between border-b-2 border-solid border-gray-200">
            <h2 className='font-semibold text-xs md:text-base leading-tight'>Skills</h2>
            <div className="flex flex-row items-center">
              <button className='shadow-sm' onClick={() => setShowModalSkills(true)}>
                <EyeIcon className='w-4 md:w-6 h-4 md:h-6 p-[0.08rem] md:p-[0.1rem] text-black rounded-md hover:bg-gray-200'/>
              </button>
              <button className='w-4 md:w-6 h-4 md:h-6 p-[0.15rem] md:p-[0.2rem] text-black rounded-md hover:bg-gray-200' onClick={() => setShowModal(true)} data-bs-target='#modalRedes'>
                <PencilIcon/>
              </button>
            </div>
          </div>
          <div className='w-full px-4 md:px-6 grow flex flex-col items-center justify-center'>
            {userSkills.length > 0 ? userSkills.slice(0,9).map((dashboard_skill) => (
              <div key={dashboard_skill.dashboard_skill_id} className="flex flex-row w-full bg-gray-100 rounded-full shadow-md px-3 my-[0.2rem] md:my-[0.3rem] h-5 md:h-7 lg:h-8 justify-between items-center">
                <h3 className='truncate text-xs md:text-sm font-bold w-4/12'>{dashboard_skill.skill.name}</h3>
                <input type="range" min="0" max="5" value={dashboard_skill.level} readOnly className="w-8/12 accent-clueless-blue rounded-full h-2 overflow-hidden"/>
              </div>
            )) : (
              <p className='font-light text-justify text-xs md:text-sm leading-none sm:leading-tight md:leading-tight lg:leading-tight'>Your skills section is empty! Click on pencil icon to edit.</p>
            )}
          </div>
        </div>
        
        {showModalSkills ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center p-3 lg:p-4 border-b-2 border-solid border-gray-200 rounded-t">
                      <h3 className="text-base md:text-lg lg:text-xl text-black font-semibold">
                        All Skills
                      </h3>
                    </div>
                    {/*body*/}
                    <div className='relative p-4 lg:p-6 flex flex-col justify-center'>
                      {userSkills.length > 0 ? (
                        <div className='overflow-y-auto h-[14.1rem]'>
                          {userSkills.map((dashboard_skill) => (
                            <div key={dashboard_skill.dashboard_skill_id} className="flex flex-row w-[22rem] bg-gray-100 rounded-full shadow-md px-3 my-[0.3rem] h-8 justify-between items-center">
                              <h3 className='truncate text-sm font-bold w-4/12'>{dashboard_skill.skill.name}</h3>
                              <input type="range" min="0" max="5" value={dashboard_skill.level} readOnly className="w-8/12 accent-clueless-blue rounded-full h-2 overflow-hidden"/>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className='font-light text-justify text-xs md:text-sm leading-none sm:leading-tight md:leading-tight lg:leading-tight'>Your skills section is empty! Click on pencil icon to edit.</p>
                      )}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-4 lg:p-6 border-t-2 border-solid border-gray-200 rounded-b">
                      <button
                        className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base"
                          onClick={() => setShowModalSkills(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : (
          <></>
          )
        }

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[40rem] my-6 mx-auto max-w-5xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center p-3 lg:p-4 border-b-2 border-solid border-gray-200 rounded-t">
                    <h3 className="text-base md:text-lg lg:text-xl text-black font-semibold">
                      Edit Skills
                    </h3>
                  </div>
                  {/*body*/}
                  <div className='relative p-4 lg:p-6 flex flex-col'>

                    <h2 className='text-base md:text-lg lg:text-xl mb-3'>Add Skill</h2>
                    <div className='flex flex-row space-x-2'>
                      <select className='grow bg-gray-100 border-[2px] py-1 rounded focus:border-gray-400' value={selectedAddedSkill} onChange={(e) => setSelectedAddedSkill(e.target.value)}>
                        <option value="" disabled hidden>Select skill</option>
                        {skills.map((skill) => (
                          <option key={skill.skill_id} value={skill.skill_id}>{skill.name}</option>
                        ))}
                      </select>
                      <select className='bg-gray-100 border-[2px] py-1 rounded focus:border-gray-400' value={selectedAddedLevel} onChange={(e) => setSelectedAddedLevel(e.target.value)}>
                        <option value="" disabled hidden>Select level</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                      <button disabled={!(selectedAddedLevel && selectedAddedSkill)} className="bg-clueless-blue text-white font-semibold px-3 py-[0.35rem] rounded-md disabled:opacity-30 hover:bg-blue-600 my-auto" onClick={handleOnAdd}>
                      +
                      </button>
                    </div>

                    <h2 className='text-base md:text-lg lg:text-xl mt-8 mb-3'>Delete Skill</h2>
                    <div className='flex flex-row items-center'>
                      <select className='bg-gray-100 border-[2px] py-1 rounded focus:border-gray-400 grow' value={selectedDeletedSkill} onChange={(e) => setSelectedDeletedSkill(e.target.value)}>
                        <option value="" disabled hidden>Select your skill</option>
                        {userSkills.map((dashboard_skill) => (
                          <option key={dashboard_skill.dashboard_skill_id} value={dashboard_skill.dashboard_skill_id}>{dashboard_skill.skill.name}: Level {dashboard_skill.level}</option>
                        ))}
                      </select>
                      <VscTrash className='ml-2 text-clueless-blue text-2xl hover:text-red-900 hover:cursor-pointer' onClick={handleOnDelete}/>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-4 lg:p-6 border-t-2 border-solid border-gray-200 rounded-b">
                    <button className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base" onClick={handleOnClose}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : (
        <></>
        )
        }
      </>
    )

  } else {
    return (
      <>
        <div className="h-[18rem] md:h-[24rem] lg:h-[30rem] w-full lg:w-1/3 flex flex-col rounded-xl shadow-md bg-white">
          <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center justify-between border-b-2 border-solid border-gray-200">
            <h2 className='font-semibold text-xs md:text-base leading-tight'>Skills</h2>
            <div className="flex flex-row items-center">
              <button className='shadow-sm' onClick={() => setShowModalSkills(true)}>
                <EyeIcon className='w-4 md:w-6 h-4 md:h-6 p-[0.08rem] md:p-[0.1rem] text-black rounded-md hover:bg-gray-200'/>
              </button>
            </div>
          </div>
          <div className='w-full px-4 md:px-6 grow flex flex-col items-center justify-center'>
            {userSkills.length > 0 ? userSkills.slice(0,9).map((dashboard_skill) => (
              <div key={dashboard_skill.dashboard_skill_id}  className="flex flex-row w-full bg-gray-100 rounded-full shadow-md px-3 my-[0.2rem] md:my-[0.3rem] h-5 md:h-7 lg:h-8 justify-between items-center">
                <h3 className='truncate text-xs md:text-sm font-bold w-4/12'>{dashboard_skill.skill.name}</h3>
                <input type="range" min="0" max="5" value={dashboard_skill.level} readOnly className="w-8/12 accent-clueless-blue rounded-full h-2 overflow-hidden"/>
              </div>
            )) : (
              <p className='font-light text-justify text-xs md:text-sm leading-none sm:leading-tight md:leading-tight lg:leading-tight'>User has not skills.</p>
            )}
          </div>
        </div>
        
        {showModalSkills ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-center p-3 lg:p-4 border-b-2 border-solid border-gray-200 rounded-t">
                      <h3 className="text-base md:text-lg lg:text-xl text-black font-semibold">
                        All Skills
                      </h3>
                    </div>
                    {/*body*/}
                    <div className='relative p-4 lg:p-6 flex flex-col justify-center'>
                      {userSkills.length > 0 ? (
                        <div className='overflow-y-auto h-[14.1rem]'>
                          {userSkills.map((dashboard_skill) => (
                            <div key={dashboard_skill.dashboard_skill_id} className="flex flex-row w-[22rem] bg-gray-100 rounded-full shadow-md px-3 my-[0.3rem] h-8 justify-between items-center">
                              <h3 className='truncate text-sm font-bold w-4/12'>{dashboard_skill.skill.name}</h3>
                              <input type="range" min="0" max="5" value={dashboard_skill.level} readOnly className="w-8/12 accent-clueless-blue rounded-full h-2 overflow-hidden"/>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className='font-light text-justify text-xs md:text-sm leading-none sm:leading-tight md:leading-tight lg:leading-tight'>User has not skills.</p>
                      )}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-4 lg:p-6 border-t-2 border-solid border-gray-200 rounded-b">
                      <button
                        className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base"
                          onClick={() => setShowModalSkills(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : (
          <></>
          )
        }
      </>
    )
  }
}

export default Skills