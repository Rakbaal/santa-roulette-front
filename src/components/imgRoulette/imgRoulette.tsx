import { useEffect, useState } from "react"

interface IProps {
    images: string[]
}
export default function ImgRoulette({images}:IProps) {
    const [imgRoll, setImgRoll] = useState(images[0])
    const [counter, setCounter] = useState(0)
    const [timing, setTiming] = useState(10)

    useEffect(() => {
        console.log(counter)
        const timer = setInterval(() => {
            const newCounter = counter < images.length - 1 ?
                counter + 1 :
                0
            setCounter(newCounter)
            const newTiming = timing + Math.floor(timing / 10)
            setTiming(newTiming)
            setImgRoll(images[counter])
        }, timing)

        return () => clearInterval(timer)
    }, [counter])

    return (
        <img src={imgRoll} style={{
            height: "20vh",
            borderRadius: "25%"
        }} />
    )
}