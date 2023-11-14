import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AuthLayout({children,authenticaton=true})
{
    const navigate=useNavigate()
    const authStatus=useSelector(state=>state.auth.status)
    const [loader,setLoader]=useState(true)
    useEffect(()=>{
        if(authenticaton && authStatus !== authenticaton)
        {
            navigate("/login")
        }
        else if(!authenticaton && authStatus !== authenticaton)
        {
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authenticaton])

    return !loader? <h1>loading</h1>:<>{children}</>
}


export default AuthLayout