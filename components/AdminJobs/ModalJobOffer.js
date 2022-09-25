import { useState, useEffect } from "react";
import SearchBar from "../Jobs/SearchBar";
import { createJob, updateJob } from "../../lib/fetching/jobs";
import { useRouter } from "next/router";

export default function ModalPortfolio({ show, onClose, data, skills}) {
    const router = useRouter();
    async function refreshData(){
        router.replace(router.asPath, undefined, { scroll: false });
    };

    const setMonth = (date) => {
        const splitDate = date.split('-');
    
        const auxDate = new Date();
        auxDate.setMonth(parseInt(splitDate[1]) - 1);
    
        return auxDate.toLocaleString('en-US', {
           month: 'long',
        });
    
    }

    const getObjectSkills = (offer_skills) => {
        let skills = []
        offer_skills.map(function(offer){
            skills.push(offer.skill) 
        })
        return skills
    }

    const [jobOffer, setjobOffer] = useState();
    const [newSkills, setNewSkills] = useState([]);
    const [month, setNewMonth] = useState(null);
    const [endMonth, setNewEndMonth] = useState(null);
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setjobOffer({...jobOffer, [name]: value});
    };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        jobOffer["start_date"] = jobOffer["start_date"] + "-" + month;
        jobOffer["end_date"] = jobOffer["end_date"] + "-" + endMonth;  
        
        if (data) {
            updateJob(jobOffer).then(() => {refreshData()});
        } else {
            createJob(jobOffer).then(() => {refreshData()});
        }
        onClose();
    };

    const setSkillsJson = (obj_skills_array) => {
        let skills_json = []
        
        if(obj_skills_array.length > 0){
            obj_skills_array.map(function(obj){
                skills_json.push({"skill_id" : obj.skill_id}) 
            })
        }
        return skills_json
    }

    useEffect(() => {
        if (data) {
            
            setNewSkills(getObjectSkills(data.jobOffer_skills));
            setjobOffer({job_id: data.job_id, position: data.position, start_date: data.start_date.split("-")[0], end_date: data.end_date.split("-")[0], description: data.description, contract: data.contract, location: data.location, skills: setSkillsJson(getObjectSkills(data.jobOffer_skills))});
            
            setNewMonth(setMonth(data.start_date))
            setNewEndMonth(setMonth(data.end_date))
            
        } else {
            setjobOffer({job_id: "", position: "", start_date: "", description: "", contract: "", location: "", skills: ""});
            setNewSkills([]);
        }
    }, [show]);

    function getYearsArray(start, end) {
        let array = new Array(end-start+1)
        for (let i = 0; i < end-start+1; i++) {
          array[i] = (end-i).toString()
        }
        return array
    }


    const getSkillsId = (skill_object) => {
        let ids = []

        skill_object.map(function(offer){
            ids.push(offer.skill_id) 
        })

        return ids;
    }



    const handleSkillClick = (skill) => {
        
        if(newSkills.length > 0){
            const new_skills_id = getSkillsId(newSkills)

            if (new_skills_id.includes(skill.skill_id)) {
                eraseSkill(skill);
                return;
            }
        }        

        setNewSkills(newSkills.concat([skill]));

    };

    useEffect(()=> {
        if(newSkills.length > 0){
            jobOffer.skills = setSkillsJson(newSkills);
        } else{
            
        }
    }, [newSkills])

    const eraseSkill = (skill) => {
        setNewSkills(newSkills.filter((f) => f.skill_id !== skill.skill_id));
        jobOffer.skills = setSkillsJson(newSkills);
    };

    return (
        <>
            {show ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b-2 border-solid border-slate-200 rounded-t">
                                <h3 className="text-2xl text-black font-semibold">
                                    {data ? "Edit Task" : "Add Task"}
                                </h3>
                            </div>
                            {/*body*/}
                            <form className="text-gray-700" onSubmit={handleSubmit}>
                                <div className="relative p-6 flex-auto">

                                    <input
                                        type="text"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-full py-3 px-4 mb-5 rounded-md"
                                        placeholder="Write title of this task"
                                        name="position"
                                        onChange={handleChange}
                                        value={jobOffer.position}
                                    />
                                    
                                    <div className="inline-flex">
                                        <div className="w-1/2">
                                            <SearchBar placeholder="Enter a Skill Name..." data={skills} handleSkillClick={handleSkillClick} />
                                        </div>

                                        <input
                                        disabled
                                        type="text"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mx-5 mb-4 rounded-md"
                                        placeholder="Skills"
                                        name="skills"
                                        
                                        value={
                                            (newSkills.length > 0) ? (
                                                newSkills.map(f => f.name)
                                            ) : ("")
                                            
                                        }
                                        />
                                    </div>

                                    <textarea
                                        cols="2"
                                        placeholder="Write a description"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-full py-3 px-4 rounded-md mb-5"
                                        name="description"
                                        onChange={handleChange}
                                        value={jobOffer.description}
                                    ></textarea>

                                    {/* <input
                                        type="text"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mr-5 mb-2 rounded-md"
                                        placeholder="Write a location"
                                        name="location"
                                        onChange={handleChange}
                                        value={jobOffer.location}
                                    /> */}

                                    <select
                                        name="start_date"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mb-2 mr-5 rounded-md"
                                        onChange={handleChange}
                                        value={jobOffer.start_date}
                                    >
                                        <option value="" disabled selected hidden>Start year</option>
                                        {getYearsArray(1950, new Date().getUTCFullYear() + 5).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>

                                    <select
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mb-2 mr-5 rounded-md"
                                        onChange={(e) => setNewMonth(e.target.value)}
                                        value={month}
                                    >
                                        <option value="" disabled selected hidden>Start month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>

                                    </select>

                                    <select
                                        name="end_date"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mb-2 mr-5 rounded-md"
                                        onChange={handleChange}
                                        value={jobOffer.end_date}
                                    >
                                        <option value="" disabled selected hidden>End year</option>
                                        {getYearsArray(1950, new Date().getUTCFullYear() + 5).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>

                                    <select
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mb-2 mr-5 rounded-md"
                                        onChange={(e) => setNewEndMonth(e.target.value)}
                                        value={endMonth}
                                    >
                                        <option value="" disabled selected hidden>End month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>

                                    </select>
                                    {/*
                                    <select
                                        name="contract"
                                        className="bg-gray-200 focus:text-black focus:outline-none w-1/7 py-3 px-4 mb-5 mr-5 rounded-md"
                                        onChange={handleChange}
                                        value={jobOffer.contract}
                                    >
                                        <option value="" disabled selected hidden>Contract</option>
                                        <option value="FULL_TIME">Full Time</option>
                                        <option value="PART_TIME">Part TIme</option>
                                    </select>  
                                        */}  
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t-2 border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold"
                                        disabled={!jobOffer.position || newSkills.length < 1 || !jobOffer.description || !jobOffer.start_date}
                                    >Save</button>

                                    <button
                                        className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold"
                                        onClick={handleCloseClick}
                                    >Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
