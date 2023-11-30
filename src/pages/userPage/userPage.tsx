import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../components/contexts/userContext"
import { Participant } from "../../models/participant"
import { formatName } from "../../utils/formatName"
import ImgRoulette from "../../components/imgRoulette/imgRoulette"


export default function UserPage() {
    const { user } = useContext(UserContext)
    const [owned, setOwned] = useState(new Participant())
    const [formatedUserPseudo, setFormatedUserPseudo] = useState<string>("")
    const [formatedOwnedPseudo, setFormatedOwnedPseudo] = useState<string>("")
    const [loader, setLoader] = useState(".")
    const [images, setImages] = useState<string[]>([])
    const navigate = useNavigate()

    const handleOwnership = async () => {
        const owned = await user.getOwned()
        let interval: NodeJS.Timer
        if (owned.id !== 0) {
            interval = setInterval(() => {
                setOwned(owned)
            }, 5000)
        } else {
            await user.setOwned()
            const newOwned = await user.getOwned()
            console.log(newOwned)
            interval = setInterval(() => {
                setOwned(newOwned)
            }, 5000)
        }

        return () => clearInterval(interval)
    }

    const fetchImages = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8081/images")
            const newImages = await response.json()
            setImages([...newImages.data])
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        user.pseudo.length > 0 && setFormatedUserPseudo(formatName(user.pseudo))
        owned.pseudo.length > 0 && setFormatedOwnedPseudo(formatName(owned.pseudo))
    }, [user, owned])

    useEffect(() => {
        const timer = setInterval(() => {
            const newLoader = loader.length < 3 ? loader + "." : "."
            setLoader(newLoader)
        }, 400)

        return () => clearInterval(timer)
    }, [loader])

    useEffect(() => {
        if (user.id === 0) {
            navigate("/")
        } else {
            handleOwnership()
        }
        fetchImages()
    }, [])

    return (
        <div className="userPage">
            {images.length > 0 && <div className="result">
                <p>Coucou <span>{formatedUserPseudo}</span>, joyeux Noël !</p>
                <p>Cette année tu dois offrir un cadeau à :</p>
                <p><span>{owned.id === 0 ? loader : formatedOwnedPseudo + " !"}</span></p>
                {owned.id === 0 ? 
                    <ImgRoulette images={images} />:
                    <img src={owned.photo} style={{
                        height: "20vh",
                        borderRadius: "25%"
                    }} />}
            </div>}
        </div>
    )
}