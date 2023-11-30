import { createContext } from "react";
import { Participant } from "../../models/participant";

interface IUserContext {
    user: Participant
    setUser: (user:Participant) => void
}

const initialParticipant = new Participant()
const UserContext = createContext<IUserContext>({
    user: initialParticipant,
    setUser: (user: Participant)=>{}
})

export default UserContext