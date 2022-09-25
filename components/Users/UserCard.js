import undefinedPic from "/public/images/u/undefined.png"
import { useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { updateRole } from "../../lib/fetching/users"

function UserCard({ user, onRefresh }) {

    const handleOnClick = async (e) => {
        const res = await updateRole({user_id: user.id, role: user.role == "USER" ? "ADMIN" : "USER"})
        if (res.ok) { // si el HTTP-status es 200-299
            onRefresh()
        }
    }

    return (
        <div className="w-full h-auto flex flex-row items-center bg-white shadow-md rounded-xl p-6">
            <Link href={"/" + user.id}>
                <a>
                    <div className="h-auto w-[3rem] sm:w-[4rem] md:w-[5rem] lg:w-[6rem] flex items-center rounded-full shadow-md mr-3 sm:mr-4 lg:mr-5">
                        {user.image ? (
                            <img className="rounded-full" src={user.image} width="100%" height="100%" alt="Profile picture"/>
                        ) : (
                            <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
                        )}
                    </div>
                </a>
            </Link>
            <div className="flex flex-row justify-between grow items-center">
                <div className="flex flex-col grow">
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="italic">{user.occupation}</p>
                    <p className="text-sm mt-2"><b className="font-semibold">Role: </b>{user.role.charAt(0) + user.role.toLowerCase().slice(1)}</p>
                </div>
                <div className="flex flex-col items-center">
                    {user.role == "ADMIN" || user.role == "USER" ? (
                        <>
                            <p className="text-sm font-semibold">Change to admin:</p>
                            <div className="mt-2 flex p-1 w-[4.2rem] shadow-md border-[0.15rem] border-gray-400 rounded-full cursor-pointer" onClick={handleOnClick}>
                                <div className={"w-8 h-5 rounded-full shadow-sm cursor-pointer " + (user.role == "ADMIN" ? "ml-[1.4rem] bg-green-500" : "bg-clueless-blue")}/>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default UserCard