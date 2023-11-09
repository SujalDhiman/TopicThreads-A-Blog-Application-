import { details } from "./conf/conf";

function App()
{
    return (
        <>
        {console.log(details.APPWRITE_COLLECTION_ID)}
        {console.log(details.APPWRITE_URL)}
        {console.log(details.APPWRITE_STORAGE_ID)}
        </>)
}


export default App;