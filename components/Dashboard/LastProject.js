import React from 'react'
import {useState} from 'react'


function LastProject({userId, viewingUserId, project}) {
    let dateStr

    if (project) {
        const startDate = new Date(project.start_date).getUTCFullYear()
        const endDate = new Date(project.end_date).getUTCFullYear()
        if (startDate == endDate) {
            dateStr = startDate.toString()
        } else {
            dateStr = startDate.toString() + "-" + endDate.toString()
        }
    }
    
    return (

        <div className='h-full w-2/3 flex flex-col rounded-xl shadow-md bg-white'>
            <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center border-b-2 border-solid border-gray-200">
                <h2 className="font-semibold text-xs md:text-base leading-tight">Last Project</h2>
            </div>
            <div className="w-full px-2 md:px-4 grow flex flex-row items-center justify-center">
                {project ? (
                    <p className='w-full text-center text-clueless-blue text-sm sm:text-base md:text-lg lg:text-xl font-light leading-tight sm:leading-snug md:leading-snug lg:leading-snug'>
                        {dateStr} &nbsp;<b className='text-black'>{project.name}</b>
                    </p>
                ) : (
                    <p className='w-full text-center text-xs md:text-sm font-light leading-none sm:leading-tight md:leading-tight lg:leading-tight'>
                        {userId == viewingUserId ? "You do not have past projects! Click on Experience and add a project." : "User has not past projects."}
                    </p>
                )}
                
            </div>
        </div>
        
    )
}

export default LastProject