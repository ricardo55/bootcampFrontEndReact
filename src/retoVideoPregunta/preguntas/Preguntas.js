import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { obtenerPreguntas } from "../datos/datos"



export const Preguntas = () => {

    const [preguntas, setPreguntas] = useState(null)

    useEffect(() => {

        let obtenerPregunta = obtenerPreguntas();

        setPreguntas(obtenerPregunta);

    }, [])


    return (
        <>{preguntas?.map((p, i) => {
            return (

                <div key={i}>
                    <p>{p.video}</p>
                    <video></video>

                    <Link to={`preguntas/${p.id}`}
                        key={p.id}><p>{p.p}</p></Link>

                </div>)


        })}



        </>
    )

}
