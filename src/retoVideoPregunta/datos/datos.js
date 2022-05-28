var preguntasJSON = [

    { id: 1, p: 'Primera', video: 'v1', completado: false },
    { id: 2, p: 'Segunda', video: 'v2', completado: false },
    { id: 3, p: 'Tercera', video: 'v3', completado: false },
    { id: 4, p: 'Cuarta', video: 'v4', completado: false }
]

export function obtenerPreguntas() {
    return preguntasJSON
}

export function ponerPreguntas(id) {

    preguntasJSON.map(p => {
        if (p.id == id) {
            p.completado = true
        }
    })
    return 'hecho'


}

console.log(preguntasJSON)
console.log(ponerPreguntas(1))
console.log(preguntasJSON)
