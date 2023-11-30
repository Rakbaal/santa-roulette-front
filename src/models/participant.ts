export class Participant {
    id: number
    pseudo: string
    famille: number
    photo: string

    getOwned = async (): Promise<Participant> => {
        let ownedParticipant: Participant
        try {
            const response = await fetch(`http://127.0.0.1:8081/owned/${this.id}`)
            const parsed = await response.json()
            ownedParticipant = new Participant(parsed.data.id, parsed.data.pseudo, parsed.data.famille, parsed.data.photo)
        } catch (error) {
            ownedParticipant = new Participant()
        }

        return ownedParticipant
    }

    setOwned = async () => {
        try {
            await fetch(`http://127.0.0.1:8081/own/${this.id}/${this.famille}`)
        } catch (error) {
            alert(error)
        }
    }

    constructor(id: number = 0, pseudo: string = "", famille: number = 0, photo: string = "") {
        this.id = id
        this.pseudo = pseudo
        this.famille = famille
        this.photo = photo
    }
}