import Image from 'next/image'
import { useState } from 'react'
import undefinedPic from "/public/images/u/undefined.png"
import { updateAbout } from '../../lib/fetching/dashboard';
import { PencilIcon } from "@heroicons/react/outline";

function About({userId, viewingUserId, image, name, occupation, bio, onRefresh}){
    if (userId === viewingUserId) { 
        const [imageSrc, setImageSrc] = useState();
        const [imageFile, setImageFile] = useState();
        const [bioText, setBioText] = useState((bio == null) ? "" : bio);
        const [nameText, setNameText] = useState(name);
        const [occupationText, setOccupationText] = useState((occupation == null) ? "" : occupation);
        const [showModal, setShowModal] = useState(false);
        const [showCancelTemplate, setShowCancelTemplate] = useState(false);

        const handleOnSubmit = async (e) => {
            e.preventDefault()
            setShowModal(false)

            let formData = new FormData()
            formData.append('user_id', userId)
            formData.append('name', nameText)
            formData.append('occupation', occupationText)
            formData.append('bio', bioText)
            if (imageFile) {
                formData.append('imageSrc', imageFile)
            }

            const res = await updateAbout(formData)
            if (res.ok) {
                onRefresh()
            }
        }

        const handleOnClose = (e) => {
            setShowModal(false)
            setImageSrc(null)
            setImageFile(null)
            setNameText(name)
            setOccupationText((occupation == null) ? "" : occupation)
            setBioText((bio == null) ? "" : bio)
        }

        const handleChangeImage = async (changeEvent) => {
            const reader = new FileReader();
            let extension = changeEvent.target.files[0].name.split('.').pop().toLowerCase()

            if (extension == "png"){
                reader.onload = function(onLoadEvent) {
                    setImageSrc(onLoadEvent.target.result)
                    setImageFile(changeEvent.target.files[0])
                }
                reader.readAsDataURL(changeEvent.target.files[0])
            } else {
                alert("You can only upload files with '.png' extension")
                setImageSrc(null)
                setImageFile(null)
            }
        }

        const handleImageLoad = (e) => {
            if (e.naturalWidth <= 1024 && e.naturalHeight <= 1024){
                if (e.naturalWidth == e.naturalHeight){
                    
                } else {
                    alert("You must upload images with the same width and height")
                    setImageSrc(null)
                    setImageFile(null)
                }
            } else {
                alert("You must upload images with width and height below 1024px")
                setImageSrc(null)
                setImageFile(null)
            }
        }

        const setCurrentTemplate = (e) => {
            e.preventDefault();
            setBioText(bio);
            setShowCancelTemplate(false);
        }

        const setTemplate1 = (e) => {
            e.preventDefault();
            setBioText("I currently work as a ____________ in ____________. I have lived my whole life in _________ and hope to be living in ________ someday.");
            setShowCancelTemplate(true);
        }
    
        const setTemplate2 = (e) => {
            e.preventDefault();
            setBioText("I am an ___________ who works for _____________ since _____. I live in ___________ and will spend the next ___ years in __________.");
            setShowCancelTemplate(true);
        }
    
        const setTemplate3 = (e) => {
            e.preventDefault();
            setBioText("I have always wanted to work for __________ since _______. Living in _____ has allowed me to do so for the most part.");
            setShowCancelTemplate(true);
        }

        return (
            <>
                <div className='h-2/3 w-full flex flex-col rounded-xl bg-white shadow-md'>
                    <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center justify-between border-b-2 border-solid border-gray-200">
                        <h2 className="font-semibold text-xs md:text-base leading-tight">About</h2>
                        <button className='w-4 md:w-6 h-4 md:h-6 p-[0.15rem] md:p-[0.2rem] text-black rounded-md hover:bg-gray-200' onClick={() => setShowModal(true)} data-bs-target='#modalRedes'>
                            <PencilIcon/>
                        </button>
                    </div>
                    <div className="w-full px-4 md:px-6 grow flex flex-row items-center justify-center">
                        <div className="h-auto w-3/12 mr-2 sm:mr-4 md:mr-5 lg:mr-6 p-[0.1rem] md:p-[0.15rem] flex items-center rounded-full border-[4px] md:border-[6px] border-gray-200">
                            {image ? (
                                <img className="rounded-full" src={image} width="100%" height="100%" alt="Profile picture"/>
                            ) : (
                                <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
                            )}
                        </div>
                        <div className="h-auto w-9/12 flex flex-col">
                            <p className="font-semibold leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-xs sm:text-sm md:text-base lg:text-lg">{name}</p>
                            {occupation ? (
                                <p className="font-normal italic leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-xs sm:text-xs md:text-sm lg:text-base">{occupation}</p>
                            ) : (
                                <></>
                            )}
                            <p className="mt-1 md:mt-2 font-light text-justify text-xs md:text-sm leading-none sm:leading-tight md:leading-tight lg:leading-tight">{bio ? bio : "Your bio is empty! Click on pencil icon to edit."}</p>
                        </div> 
                    </div>
                </div>

                {showModal ? (
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
                                    About 
                                </h3>

                                </div>
                                {/*body*/}
                                <form onSubmit={handleOnSubmit}>
                                    <div className="relative p-4 lg:p-6 flex-auto">
                                        
                                        <div className='border-b-2 border-gray-500'>
                                            <p className='pb-1 text-sm md:text-base lg:text-lg font-semibold text-gray-600'>Profile
                                            </p>
                                        </div>
                                        <div className="mt-2 flex flex-row items-center justify-center">
                                            <div className='flex flex-col grow'>
                                                <label className="block mb-1 text-xs md:text-sm lg:text-base text-gray-600" htmlFor="file_input">
                                                    Upload profile picture:
                                                </label>
                                                <input className="block w-full text-sm text-gray-900 bg-gray-200 rounded-sm cursor-pointer focus:outline-none" id="file_input" type="file" onChange={handleChangeImage}/>
                                                <p className="mt-1 text-xs md:text-sm text-gray-600" id="file_input_help">PNG (Scale 1:1, Max. 1024x1024px).</p>
                                            </div>

                                            {imageSrc ? (
                                                <div className='h-auto w-[3rem] md:w-[5rem] p-2'>
                                                    <Image src={imageSrc} alt="profile_image" width="100%" height="100%" layout="responsive" objectFit="contain" onLoadingComplete={(e) => {handleImageLoad(e)}}/>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                            
                                        </div>

                                        <div className='mt-3 flex flex-row items-center'>
                                            <label className="block mb-1 mr-2 text-xs md:text-sm lg:text-base text-gray-600">
                                                Name:
                                            </label>
                                            <input
                                            type="text"
                                            className="bg-gray-200 px-2 md:px-3 py-1 w-full rounded-md text-justify text-xs sm:text-sm md:text-base outline-gray-400"
                                            placeholder="Write your name"
                                            onChange={(e) => setNameText(e.target.value)}
                                            value={nameText}/>
                                        </div>

                                        <div className='mt-3 mb-5 flex flex-row items-center'>
                                            <label className="block mb-1 mr-2 text-xs md:text-sm lg:text-base text-gray-600">
                                                Occupation:
                                            </label>
                                            <input
                                            type="text"
                                            className="bg-gray-200 px-2 md:px-3 py-1 w-full rounded-md text-justify text-xs sm:text-sm md:text-base outline-gray-400"
                                            placeholder="Write your occupation (e. Front-end engineer)"
                                            onChange={(e) => setOccupationText(e.target.value)}
                                            value={occupationText}/>
                                        </div>

                                        
                                        <div className='border-b-2 border-gray-500'>
                                            <p className='pb-1 text-sm md:text-base lg:text-lg font-semibold text-gray-600'>Bio
                                            </p>
                                        </div>
                                        <div className='flex justify-center'>
                                            <textarea className="mt-2 mb-1 bg-gray-200 px-2 md:px-4 py-1 md:py-3 rounded-lg h-[7rem] sm:h-[8rem] md:h-[9rem] lg:h-[10rem] w-[20rem] sm:w-[26rem] md:w-[32rem] lg:w-[38rem] text-justify text-xs sm:text-sm md:text-base outline-gray-400" maxLength="400" placeholder='Write your bio (Max. 400 characters)' value={bioText} onChange={(e) => setBioText(e.target.value)}/>
                                        </div>
                                        <div className='flex flex-row items-center justify-end py-1'>
                                            <h1 className='mr-2 lg:mr-3 text-xs md:text-sm lg:text-base text-gray-600'>Template Suggestions:
                                            </h1>
                                            <div className='flex flex-row'>
                                                <button className="bg-gray-400 hover:bg-gray-500 outline-none focus:outline-none mr-1 lg:mr-2 ease-linear transition-all duration-150 px-3 py-1 disabled:opacity-30 rounded-md text-white text-xs lg:text-sm"
                                                onClick={setTemplate1}>
                                                    1
                                                </button>
                                                <button className="bg-gray-400 hover:bg-gray-500 outline-none focus:outline-none mr-1 lg:mr-2 ease-linear transition-all duration-150 px-3 py-1 disabled:opacity-30 rounded-md text-white text-xs lg:text-sm"
                                                onClick={setTemplate2}>
                                                    2
                                                </button>
                                                <button className="bg-gray-400 hover:bg-gray-500 outline-none focus:outline-none ease-linear transition-all duration-150 px-3 py-1 disabled:opacity-30 rounded-md text-white text-xs lg:text-sm"
                                                onClick={setTemplate3}>
                                                    3
                                                </button>
                                                { showCancelTemplate ? (
                                                    <button className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ml-1 lg:ml-2 ease-linear transition-all duration-150 px-3 py-1 disabled:opacity-30 rounded-md text-white text-xs lg:text-sm"
                                                    onClick={setCurrentTemplate}>
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                            
                                    </div> 
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-4 lg:p-6 border-t-2 border-solid border-gray-200 rounded-b">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 outline-none focus:outline-none mr-2 lg:mr-3 ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base">
                                            Save
                                        </button>
                                        <button
                                            className="bg-clueless-blue hover:bg-blue-600 outline-none focus:outline-none ease-linear transition-all duration-150 px-5 py-2 disabled:opacity-30 rounded-md text-white font-bold text-sm lg:text-base"
                                            onClick={handleOnClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>     
                                </form>
                                
                                
                            </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : (
                    <>
                    </>
                )}
            </>

        )
    } else {
        return(
            <div className='h-2/3 w-full flex flex-col rounded-xl bg-white shadow-md'>
                <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center justify-between border-b-2 border-solid border-gray-200">
                    <h2 className="font-semibold text-xs md:text-base leading-tight">About</h2>
                </div>
                <div className="w-full px-4 md:px-6 grow flex flex-row items-center justify-center">
                    <div className="h-auto w-3/12 mr-2 sm:mr-4 md:mr-5 lg:mr-6 p-[0.1rem] md:p-[0.15rem] flex items-center rounded-full border-[4px] md:border-[6px] border-gray-200">
                        {image ? (
                            <img className="rounded-full" src={image} width="100%" height="100%" alt="Profile picture"/>
                        ) : (
                            <Image className="rounded-full" src={undefinedPic} alt="Profile picture"/>
                        )}
                    </div>
                    <div className="h-auto w-9/12 flex flex-col">
                        <p className="font-semibold leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-xs sm:text-sm md:text-base lg:text-lg">{name}</p>
                        {occupation ? (
                            <p className="font-normal italic leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-xs sm:text-xs md:text-sm lg:text-base">{occupation}</p>
                        ) : (
                            <></>
                        )}
                        <p className="mt-1 md:mt-2 font-light text-justify text-xs md:text-sm leading-none sm:leading-tight md:leading-tight lg:leading-tight">{bio}</p>
                    </div> 
                </div>
            </div>
        )
    }


}

export default About