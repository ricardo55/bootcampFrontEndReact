import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './verVideos.css';

import { Pregunta } from './retoVideoPregunta/preguntas/pregunta';
import { Preguntas } from './retoVideoPregunta/preguntas/preguntas';

function App() {

    return (

        <div className="App">
            <BrowserRouter>

                <Routes>

                    <Route path='/' element={<Preguntas />}></Route>

                    <Route path='preguntas/:id' element={<Pregunta />} />


                </Routes>

            </BrowserRouter>
            {/* <Video/> */}

        </div>
    );
}

export default App;
