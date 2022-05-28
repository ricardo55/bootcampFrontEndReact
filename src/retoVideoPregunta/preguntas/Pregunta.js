import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { obtenerPreguntas } from "../datos/datos"
import Video from "../videos/videos"


export const Pregunta = () => {

    const [pregunta, setPregunta] = useState(null)

    const { id } = useParams()

    const [idStatus, setId] = useState(id)



    // Esta funcion sirve para poder obtener la pregunta que se esta viendo
    useEffect(() => {

        let obtenerPregunta = obtenerPreguntas()

        obtenerPregunta = obtenerPreguntas.filter(p => p.id === Number(id))

        setPregunta(obtenerPregunta)

    }, [idStatus])



    return (
        <div>
            <Video id={id} />
            <p>{pregunta ? pregunta[0].p : null}</p>

        </div>
    )
}
