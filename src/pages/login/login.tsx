import { useContext, useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import UserInput from "../../components/userInput/userInput"
import { Participant } from "../../models/participant"
import UserContext from "../../components/contexts/userContext"


export default function Login() {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(user.id !== 0) {
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/user-page")
            console.log("navigating to user-page")
        } 
    }, [user])

    return (
        <UserInput setUser={setUser}/>
    )
}