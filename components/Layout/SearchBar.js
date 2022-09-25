import { useState } from "react"
import Link from 'next/link'
import { getUserByName } from "../../lib/fetching/users"
import { RiSearchLine } from "react-icons/ri"
import { RiCloseCircleFill } from "react-icons/ri"
import { VscTriangleUp } from "react-icons/vsc"
import undefinedPic from "/public/images/u/undefined.png"
import Image from 'next/image'

function SearchBar() {
    const [wordEntered, setWordEntered] = useState("")
    const [showSearchIcon, setShowSearchIcon] = useState(true)
    const [showClearIcon, setShowClearIcon] = useState(false)
    const [users, setUsers] = useState([])
    const [showUsers, setShowUsers] = useState(false)

    const handleOnChange = async (event) => {
        event.preventDefault()
        const searchWord = event.target.value
        setWordEntered(searchWord)
    
        if (searchWord !== "") {
            const res = await getUserByName(searchWord)

            if (res.ok) { // si el HTTP-status es 200-299
                const users_response = await res.json()
                if (users_response.length > 0) {
                    setUsers(users_response)
                    setShowUsers(true)
                } else {
                    setUsers([])
                    setShowUsers(false)
                }
            }
        } else {
            setUsers([])
            setShowUsers(false)
        }
    };

    const handleOnClick = async (event) => {
        event.preventDefault()
        setShowSearchIcon(false)
        setShowClearIcon(true)

        if (users.length > 0) {
            setShowUsers(true)
        }
    }

    const handleOnBlur = (event) => {
        event.preventDefault()
        setTimeout(function () {
            setShowSearchIcon(true)
        }, 200)
        setTimeout(function () {
            setShowClearIcon(false)
        }, 200)
        setTimeout(function () {
            setShowUsers(false)
        }, 200)
    }

    const handleOnClickUser = (event) => {
        event.preventDefault()
        setWordEntered("")
        setTimeout(function () {
            setUsers([])
        }, 200)
    }

    const handleOnClickClearIcon = (event) => {
        event.preventDefault()
        setWordEntered("")
        setTimeout(function () {
            setUsers([])
        }, 200)
    }

    return (
        <div className="dropdown inline-block relative w-full">
            <div className="flex flex-row items-center bg-white w-full py-2 px-4 rounded-full">
                <RiSearchLine className="h-3 sm:h-4 lg:h-5 w-3 sm:w-4 lg:w-5 text-gray-400 mr-2" hidden={!showSearchIcon}/>

                <input
                    className="w-full font-light text-xs sm:text-sm lg:text-base text-gray-600 outline-none placeholder-gray-400"
                    type="text"
                    placeholder="Search on Clueless Management"
                    value={wordEntered}
                    onChange={handleOnChange}
                    onClick={handleOnClick}
                    onBlur={handleOnBlur}
                />

                <RiCloseCircleFill className="h-3 sm:h-4 lg:h-5 w-3 sm:w-4 lg:w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-2" hidden={!showClearIcon} onClick={handleOnClickClearIcon}/>

            </div>
            {showUsers ? (
                <div className="flex flex-col items-center absolute w-full z-40">
                    <div className="text-white text-xl -mb-2">
                        <VscTriangleUp/>
                    </div>  
                    <ul className="dropdown-menu bg-white rounded-lg text-black shadow-lg w-[18rem] sm:w-[20rem] md:w-[22rem] lg:w-[30rem]">
                        {
                            users.map((user) => (
                                <li key={user.id} className="hover:bg-gray-200 rounded-lg cursor-pointer px-3 py-2" onClick={handleOnClickUser}>
                                    <Link href={"/" + user.id}>
                                        <a>
                                            <div className="flex flex-row items-center">
                                                <div className="h-auto w-[1.8rem] sm:w-[2.2rem] lg:w-[2.6rem] flex items-center rounded-full border-[3px] border-gray-600">
                                                    {user.image ? (
                                                        <img className="rounded-full" src={user.image} alt="Profile picture"/>
                                                    ) : (
                                                        <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
                                                    )}
                                                </div>
                                                <div className='ml-2 text-gray-600'>
                                                    <h2 className='font-bold text-xs md:text-sm self-center'>{user.name}</h2>
                                                    <h3 className='italic text-xs self-center'>{user.occupation}</h3>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            ))
                        }
                        
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default SearchBar