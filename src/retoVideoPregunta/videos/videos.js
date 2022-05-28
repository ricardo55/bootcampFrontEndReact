import { useState } from "react"
import { Link, useParams, useSearchParams, generatePath, useNavigate } from "react-router-dom";
import { ponerPreguntas } from "../datos/datos"



let mediaRecorder;
let grabaciones;



export default function Video({ id }) {

    const [grabacionDeshabilitar, setGrabacionDeshabilitar] = useState(true);
    const [reproducirDeshabilitar, setReproducirDeshabilitar] = useState(true);
    const [descargaDeshabilitar, setDescargaDeshabilitar] = useState(true);

    let navigate = useNavigate();




    const inicio = async (constraints) => {

        try {

            const stream = await navigator.mediaDevices.getUserMedia(constraints)

            manejarExitoVideo(stream)

        } catch (e) {

            console.log(e)
        }



    }

    const manejarExitoVideo = (stream) => {

        setGrabacionDeshabilitar((grabacionDeshabilitar) => !grabacionDeshabilitar)

        window.stream = stream

        const mostrarVideo = document.querySelector('video#pegarVid')

        mostrarVideo.srcObject = stream

    }





    const ManejarIniciarVideo = async () => {

        const constraints = {
            video: {
                width: 500, height: 300
            }
        }

        console.log('Uso de video', constraints)

        await inicio(constraints)

    }

    const manejarGrabacion = () => {

        console.log('grabar')

        if (document.getElementById('record').textContent === 'Rec') {

            iniciarGrabacion()

        } else {
            pararGrabacion()
            document.getElementById('record').textContent = 'Rec'
        }

    }


    function pararGrabacion() {
        mediaRecorder.stop();
    }



    const iniciarGrabacion = () => {

        grabaciones = [];

        let opciones = { mimeType: 'video/webm;codecs=vp9,opus' };
        try {

            mediaRecorder = new MediaRecorder(window.stream, opciones);

            console.log('Se creo MediaRecorder', mediaRecorder, 'con opciones', options);

            document.getElementById('record').textContent = 'Stop Recording';
            setReproducirDeshabilitar((reproducirDeshabilitar) => !reproducirDeshabilitar)


            setDescargaDeshabilitar((descargaDeshabilitar) => !descargaDeshabilitar)
            mediaRecorder.onstop = (event) => {

                console.log('Grabacion parada: ', event);
                console.log('Blobs de Grabacion: ', grabaciones);
            };

            mediaRecorder.ondataavailable = manejarDatosDisponibles;
            mediaRecorder.start();
            console.log('MediaRecorder inicio', mediaRecorder);




        } catch (e) {
            console.error('Exception mientras se creo MediaRecorder:', e);
            return;
        }


    }


    function manejarDatosDisponibles(event) {
        console.log('manejarDatosDisponibles', event);

        if (event.data && event.data.size > 0) {
            grabaciones.push(event.data);
        }
    }

    function manejarReproducir() {

        const reproduccionLista = new Blob(grabaciones, { type: 'video/webm' });
        document.getElementById('recorded').src = null;
        document.getElementById('recorded').srcObject = null;
        document.getElementById('recorded').src = window.URL.createObjectURL(reproduccionLista);
        document.getElementById('recorded').controls = true;
        document.getElementById('recorded').play();

        console.log('url: ', window.URL.createObjectURL(reproduccionLista))


    }

    function manejarDescarga() {

        const blob = new Blob(grabaciones, { type: 'video/mp4' });

        const url = window.URL.createObjectURL(blob);
        console.log(url)

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    function manejarElsiguiente(e) {


        ponerPreguntas(e.target.id)
        navigate(`/preguntas/${String(Number(e.target.id) + 1)}`, { replace: true })
        cargarPagina()



    }

    function cargarPagina() {
        window.location.reload(false);
    }



    return (

        <div>


            <video src=" " id='pegarVid' playsInline autoPlay ></video>
            <div>
                <video src="" id="recorded" playsInline loop autoPlay></video>
            </div>



            <button onClick={ManejarIniciarVideo} id='start'>Comenzar</button>

            <button onClick={manejarGrabacion} disabled={grabacionDeshabilitar} id="record">Grabar</button>

            <button onClick={manejarReproducir} disabled={reproducirDeshabilitar} id="play">Reproducir</button>

            {/* <button onClick={manejarDescarga} disabled={descargaDeshabilitar} id="dowload">Dowload</button> */}

            <button id={id} onClick={(e) => manejarElsiguiente(e)}>Siguiente</button>



        </div>
    )
}
