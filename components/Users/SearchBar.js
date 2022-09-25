import { useState } from "react"
import Link from 'next/link'
import { getUserByName } from "../../lib/fetching/users"
import { RiSearchLine } from "react-icons/ri"
import { RiCloseCircleFill } from "react-icons/ri"
import { VscTriangleUp } from "react-icons/vsc"
import undefinedPic from "/public/images/u/undefined.png"
import Image from 'next/image'
import UserCard from "./UserCard"

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

    const onRefresh = async () => {
        if (wordEntered !== "") {
            const res = await getUserByName(wordEntered)

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
    }

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
            <div className="flex flex-row items-center bg-white w-full py-3 px-5 mb-[2rem] shadow-md rounded-full">
                <RiSearchLine className="h-3 sm:h-4 lg:h-5 w-3 sm:w-4 lg:w-5 text-gray-400 mr-2" hidden={!showSearchIcon}/>

                <input
                    className="w-full font-light text-sm sm:text-base lg:text-lg text-gray-600 outline-none placeholder-gray-400"
                    type="text"
                    placeholder="Search user"
                    value={wordEntered}
                    onChange={handleOnChange}
                    onClick={handleOnClick}
                    onBlur={handleOnBlur}
                />

                <RiCloseCircleFill className="h-3 sm:h-4 lg:h-5 w-3 sm:w-4 lg:w-5 text-gray-400 hover:text-gray-600 cursor-pointer ml-2" hidden={!showClearIcon} onClick={handleOnClickClearIcon}/>
            </div>

            {showUsers ? (
                <div className="w-full h-auto flex flex-col space-y-4">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} onRefresh={() => onRefresh()}/>
                    ))
                    }     
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default SearchBar