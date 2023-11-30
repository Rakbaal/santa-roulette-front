import { useState } from "react"
import { Participant } from "../../models/participant"

interface IProps {
    setUser: (user: Participant) => void
}

export default function UserInput({setUser}: IProps) {
    const [input, setInput] = useState("")

    const sendInput = async (e: React.MouseEvent) => {
        e.preventDefault()
        let response
        try {
            response = await fetch(`http://127.0.0.1:8081/user/${input}`)
            const parsed = await response.json()
            const newUser = new Participant(parsed.data.id, parsed.data.pseudo, parsed.data.famille, parsed.data.photo)
            setUser(newUser)
            if (newUser.id === 0) {
                alert("JE TE CONNAIS PAS, OUSTE")
            }
        } catch (error) {
            alert("Une erreur est survenue:\n" + error)
        }
    }
    return (
        <form className="userInput">
                <label htmlFor="text">Qui est-ce ?</label>
                <input placeholder="Tape ton nom ici !" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" onClick={sendInput}>C'est parti !</button>
        </form>
    )
}