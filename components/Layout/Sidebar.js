import { BriefcaseIcon, UserIcon, NewspaperIcon, UserGroupIcon, ViewGridAddIcon, HomeIcon} from "@heroicons/react/solid";
import Link from 'next/link'
import SidebarRow from "./SidebarRow";
import React from 'react'
import undefinedPic from "/public/images/u/undefined.png"
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import {useSession} from "next-auth/client"

function Sidebar({ sessionData, user }) {

  const infoSignIn = () => {
    toast.info('Sign in to use this function!', {
       toastId: "error-signin",
       position: "bottom-center",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: false,
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
    });
  }

  if (user) {
    return (
      <div className="w-auto h-full flex flex-col p-2 sm:p-3 lg:p-4 pt-4 sm:pt-5 lg:pt-6 font-semibold sticky top-0">
          <div className="flex flex-col mb-2 border-b-2 border-solid border-gray-200">
            <div className="flex flex-row px-2 pb-3">
              <div className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 rounded-full border-[3px] border-clueless-blue">
                {user.image ? (
                    <img className="rounded-full" src={user.image} alt="Profile picture"/>
                ) : (
                    <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
                )}
              </div>
              <h2 className='hidden sm:inline-flex self-center ml-2 text-xs md:text-sm font-semibold text-black'>{user.name.split(" ")[0]}</h2>
            </div>

            <Link href={"/" + user.id}>  
              <a><SidebarRow Icon = {UserIcon} title="Profile" status="active"/></a>
            </Link>
            
            <Link href={"/" + user.id + "/experience"}>
              <a><SidebarRow Icon = {BriefcaseIcon} title="Experience" status="active"/></a>
            </Link>
          </div>

          <Link href="/tasks">
            <a><SidebarRow Icon = {NewspaperIcon} title="Tasks" status="active"/> </a>
          </Link>

          {sessionData && (sessionData.role == "ADMIN" || sessionData.role == "MASTER") ? (
            <Link href="/tasks/admin">
              <a><SidebarRow Icon = {ViewGridAddIcon} title="A-Tasks" status="active"/> </a>
            </Link>
          ) : (
            <></>
          )}

          {sessionData && sessionData.role == "MASTER" ? (
            <Link href="/users">
              <a><SidebarRow Icon = {UserGroupIcon} title="Users" status="active"/> </a>
            </Link>
          ) : (
            <></>
          )}

      </div>
    )
  }

  return (
    <>
      <ToastContainer/>
      <div className="w-auto h-full flex flex-col p-2 sm:p-3 lg:p-4 pt-4 sm:pt-5 lg:pt-6 font-semibold sticky top-0">
        <Link href="/tasks">
          <a><SidebarRow Icon = {NewspaperIcon} title="Tasks" status="active"/> </a>
        </Link>

        <div className="flex flex-col pt-2 border-t-2 border-solid border-gray-200">

          <button onClick={() => infoSignIn()}>
            <SidebarRow Icon = {UserIcon} title="Profile" status="disabled"/>
          </button>

          <button onClick={() =>  infoSignIn()}>
            <SidebarRow Icon = {BriefcaseIcon} title="Experience" status="disabled"/>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar