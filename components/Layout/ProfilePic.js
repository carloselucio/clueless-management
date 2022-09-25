import React from 'react'
import Image from 'next/image'
import {useState, useRef} from "react"
import undefinedPic from "/public/images/u/undefined.png"

function ProfilePic({ profilePic }) {
   
    return(
        <div className="h-auto w-10 sm:w-12 lg:w-14 flex items-center rounded-full border-[3px] border-white mr-1 sm:mr-2 lg:mr-3">
            {profilePic ? (
                <img className="rounded-full" src={profilePic} alt="Profile picture"/>
            ) : (
                <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
            )}
        </div>
    )
}

export default ProfilePic