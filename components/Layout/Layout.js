import Head from 'next/head';
import Sidebar from "./Sidebar";
import Banner from './Banner';

const Layout = ({ children, sessionData, viewingUser }) => {

    return (
        <>
            <Head>
                <title>Clueless Management</title>
            </Head>
            
            <main className="h-screen w-full flex flex-col bg-white sticky top-0 z-50">
                
                <Banner sessionData={sessionData}/>
                
                <div className='w-full flex grow grid-flex'>
                    
                    <Sidebar sessionData={sessionData} user={viewingUser}/>
                    
                    <div className="h-full w-full px-[1.8rem] sm:px-[2.2rem] md:px-[2.6rem] lg:px-[3rem] py-[1.8rem] sm:py-[2.2rem] md:py-[2.6rem] lg:py-[3rem] bg-gray-200 shadow-inset rounded-tl-2xl">{children}</div>
                    
                </div>
            </main>
        </>
    );
};

export default Layout;