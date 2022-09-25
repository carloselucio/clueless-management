import { useState, useEffect } from "react";
import { createExperience, updateExperience } from '../../lib/fetching/experiences'

export default function ModalPortfolio({ show, onClose, onSave, data, user_id }) {
    const [experience, setExperience] = useState();

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setExperience({...experience, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data) {
            updateExperience(experience).then(() => {onSave()});
        } else {
            createExperience(experience).then(() => {onSave()});
        }
        onClose();
    };
    
    useEffect(() => {
        if (data) {
            setExperience({user_id: user_id, experience_id: data.experience_id, type: data.type, name: data.name, description: data.description, start_date: data.start_date, end_date: data.end_date});
            
        } else {
            setExperience({user_id: user_id, type: "", name: "", description: "", start_date: "", end_date: ""});
        }
    }, [show]);

    function getYearsArray(start, end) {
        let array = new Array(end-start+1)
        for (let i = 0; i < end-start+1; i++) {
          array[i] = (end-i).toString()
        }
        return array
    }

    return (
        <>
            {show ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-3 lg:p-4 border-b-2 border-solid border-gray-200 rounded-t">
                                    <h3 className="text-base md:text-lg lg:text-xl text-black font-semibold">
                                        {data ? "Edit Experience" : "Add Experience"}
                                    </h3>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleSubmit}>
                                    <div className="relative p-4 lg:p-6 flex-auto">

                                        <select
                                            name="type"
                                            className="bg-gray-200 text-gray-700 focus:text-black focus:outline-none w-2/7 py-3 px-4 mb-5 mr-5 rounded-md"
                                            onChange={handleChange}
                                            value={experience.type}
                                        >
                                            <option value="" disabled hidden>Choose a type</option>
                                            <option value="JOB">Past Job</option>
                                            <option value="PERSONAL_PROJECT">Past Project</option>
                                            <option value="EDUCATION">Education & Certificates</option>
                                        </select>

                                        <select
                                            name="start_date"
                                            className="bg-gray-200 text-gray-700  focus:text-black focus:outline-none w-2/7 py-3 px-4 mb-5 mr-5 rounded-md"
                                            onChange={handleChange}
                                            value={experience.start_date}
                                        >
                                            <option value="" disabled hidden>Choose a start year</option>
                                            {getYearsArray(1950, new Date().getUTCFullYear()).map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>

                                        <select
                                            name="end_date"
                                            className="bg-gray-200 text-gray-700 focus:text-black focus:outline-none w-2/7 py-3 px-4 mb-5 rounded-md"
                                            onChange={handleChange}
                                            value={experience.end_date}
                                        >
                                            <option value="" disabled hidden>Choose an end year</option>
                                            {getYearsArray(1950, new Date().getUTCFullYear()).map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>

                                        <input
                                            type="text"
                                            className="bg-gray-200 focus:text-black focus:outline-none w-full py-3 px-4 mb-5 rounded-md"
                                            placeholder="Write a name"
                                            name="name"
                                            onChange={handleChange}
                                            value={experience.name}
                                        />

                                        <textarea
                                            cols="2"
                                            placeholder="Write a description"
                                            className="bg-gray-200 focus:text-black focus:outline-none w-full py-3 px-4 rounded-md"
                                            name="description"
                                            onChange={handleChange}
                                            value={experience.description}
                                        ></textarea>
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-4 lg:p-6 border-t-2 border-solid border-gray-200 rounded-b">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 outline-none focus:outline-none mr-2 lg:mr-3 ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base"
                                            disabled={!experience.name || !experience.type || !experience.start_date || !experience.end_date}
                                        >Save</button>

                                        <button
                                            className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base"
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
    );
}