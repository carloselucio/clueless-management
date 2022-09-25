import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/Users/SearchBar";
import ErrorContainer from "../components/Templates/ErrorContainer";

// This page show the view of the app when a user is not signed in.

function Users() {
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
    }

    if (session && session.user.role == "MASTER") { // This is editable returned page
        return (
            <Layout sessionData={sessionDataToLayout} viewingUser={{id: session.user.id, name: session.user.name, image: session.user.image}}>
                <SearchBar onRefresh={() => refreshData()}/>
            </Layout>
        )
    } else {
        return (
            <Layout sessionData={sessionDataToLayout}>
                <ErrorContainer code={401} message={"You are not authorized to use this function."}/>
            </Layout>
        )
    }
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            session: await getSession(context)
        }
    }
}

export default Users