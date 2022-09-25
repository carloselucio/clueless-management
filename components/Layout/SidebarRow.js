import Image from "next/image"

function SidebarRow({src, Icon, title, status}) {

  if (status === "active"){
    return (
      <div className="flex items-center space-x-2 px-2 py-3 mb-2 text-clueless-blue hover:bg-gray-100 rounded-xl cursor-pointer transition duration-00">
          {src && (
            <div className="h-8 w-8">
              <Image 
                  className="rounded-full"
                  src={src}
              />
            </div>
          )}
          {Icon && <Icon className= "h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8"/>}
          <p className="hidden sm:inline-flex text-xs md:text-sm font-semibold text-black">{title}</p>
      </div>
    )
  } else if (status === "disabled") {
    return (
      <div className="flex items-center space-x-2 px-2 py-3 mb-2 text-gray-300 hover:bg-gray-100 rounded-xl cursor-pointer transition duration-00">
          {src && (
            <div className="h-8 w-8">
              <Image 
                  className="rounded-full"
                  src={src}
              />
            </div>
          )}
          {Icon && <Icon className= "h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8"/>}
          <p className="hidden sm:inline-flex text-xs md:text-sm font-semibold text-gray-300">{title}</p>
      </div>
    )
  }
}

export default SidebarRow