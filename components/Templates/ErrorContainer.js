function ErrorContainer({code, message}) {
    return (
        <div className='bg-white w-full p-2 flex flex-col rounded-xl shadow-md bg-white'>
            <div className="h-[2.25rem] md:h-[3rem] w-full px-2 md:px-4 flex items-center border-b-2 border-solid border-gray-200">
                <h2 className="font-semibold text-clueless-blue text-base md:text-lg leading-tight">Error {code}</h2>
            </div>
            <div className="w-full p-2 md:p-4 grow flex flex-row">
                <h2 className="text-base md:text-lg leading-tight">{message}</h2>
            </div>
        </div>
    )
}

export default ErrorContainer
