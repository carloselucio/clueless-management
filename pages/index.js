import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Image from 'next/image';
import home from "/public/images/home.svg";

// This page is the home page of the app.

export default function Home() {
  const { data: session } = useSession();
  let sessionDataToLayout = null;
  const router = useRouter();

  async function refreshData(){
    router.replace(router.asPath, undefined, { scroll: false });
  };
  
  if (session) {
    sessionDataToLayout = {
      id: session.user.id,
      image: session.user.image,
      name: session.user.name,
      occupation: session.user.occupation,
      role: session.user.role,
    }

    return (
      <Layout sessionData={sessionDataToLayout} viewingUser={{id: session.user.id, name: session.user.name, image: session.user.image}}>          
        <div className="w-full flex flex-row items-center bg-white rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-md">
          <div className="flex flex-col w-3/12">
            <p className="ml-1 md:ml-4 lg:ml-5 font-light text-base sm:text-lg md:text-2xl lg:text-4xl mb-4">Welcome to <b className="font-bold">Clueless </b><b className="font-bold text-clueless-blue">Management</b>!</p>
            <p className="ml-1 md:ml-4 lg:ml-5 font-light text-xs sm:text-sm md:text-base lg:text-xl">The profiles web application for clueless managers.</p>
          </div>
          <div className="w-9/12 flex flex-wrap justify-center">
            <Image className="max-w-full h-auto" src={home}/>
          </div>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout sessionData={sessionDataToLayout}>
      <div className="w-full flex flex-row items-center bg-white rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-md">
        <div className="flex flex-col w-3/12">
          <p className="font-light text-base sm:text-lg md:text-2xl lg:text-4xl mb-4">Welcome to <b className="font-bold">Clueless </b><b className="font-bold text-clueless-blue">Management</b>!</p>
          <p className="font-light text-xs sm:text-sm md:text-base lg:text-xl">The profiles web application for clueless managers.</p>
        </div>
        <div className="w-9/12 flex flex-wrap justify-center">
          <Image className="max-w-full h-auto" src={home}/>
        </div>
      </div>
    </Layout>
  );
  
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

