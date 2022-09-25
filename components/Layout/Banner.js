import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProfilePic from './ProfilePic'
import cluelessLogo from "/public/images/cluelessManagement.png"
import DropDownMenu from "./DropDownMenu.js"
import {RiLoginBoxLine} from "react-icons/ri";
import {RiSearchLine} from "react-icons/ri";
import SearchBar from './SearchBar'

function Banner({ sessionData }) {
    return (
    <div className='flex flex-col'>
        <div className='flex flex-row bg-white'>
            <div className='w-24 sm:w-32 lg:w-36 ml-4 sm:ml-5 lg:ml-6 mt-4 sm:mt-6 lg:mt-8 self-center'>
                <Link href="/">
                    <a>
                        <Image className='hover:cursor-pointer'
                                src={cluelessLogo}
                        />
                    </a>
                </Link>
            </div>

            <div className="w-[4rem] sm:w-[4.5rem] lg:w-[5rem] border-solid border-t-clueless-blue border-r-clueless-blue border-[32px] sm:border-[36px] lg:border-[40px] border-l-transparent border-b-transparent" />

            <div className='flex flex-row justify-between h-[4rem] sm:h-[4.5rem] lg:h-[5rem] grow bg-clueless-blue text-white'>
                <div className='flex items-center w-2/3 sm:w-1/3 md:w-5/12 lg:w-[28rem]'>
                    <SearchBar/>
                </div>
                <div className='flex flex-row self-center mr-3 sm:mr-6 lg:mr-10'>
                    {sessionData ? (
                        <>
                            <Link href={"/" + sessionData.id}>
                                <a>
                                    <div className='flex flex-row cursor-pointer'>
                                        <ProfilePic profilePic={sessionData.image}/>
                                        <div className='hidden sm:inline-flex flex flex-col self-center mr-1 sm:mr-2 lg:mr-3'>
                                            <h2 className='font-bold h-5 text-sm'>{sessionData.name}</h2>
                                            <h3 className='italic text-xs'>{sessionData.occupation}</h3>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                            <DropDownMenu/>
                        </>
                    ) : (
                        <Link href="/api/auth/signin">
                            <div className="flex items-center space-x-2 p-3 mb-1 hover:bg-blue-600 font-light rounded-xl cursor-pointer">
                                <RiLoginBoxLine className="h-4 sm:h-5 lg:h-6 w-4 sm:w-5 lg:w-6 text-white"/>
                                <p className="text-xs sm:text-sm lg:text-base font-normal">Sign in</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
        <div className='h-[0.8rem] sm:h-[1rem] lg:h-[1.3rem]'></div>
    </div>
  )
}

export default Banner