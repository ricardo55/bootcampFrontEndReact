import { Button } from "@mui/material";
import {
  createContext,
  useEffect,
  useState,
  useRef,
  memo,
  useMemo,
  useCallback,
  useContext
} from "react";
const Context = createContext();

/*
  Ciclo de vida de un componente:
    constructor // 

    componentWillmount // es una funcion que se ejecuta antes del primer render
    render // es la funcion encargada de mostrar los cambios en la vista
    componentDidMount // es una funcion que se ejecuta justo despues del primer render
      // se usa para inicializar data mediante apis
      // se usa para inicializar listeners 
        // window.addEventListener('resize', () => {

        //})
      // obtener elemento del DOM

    componenteWillReceiveProps // cuando el componente va a recibir nuevos props

    shouldComponenteUpdate(prevProps, prevState) {
      if(prevProps.campo1 === this.props.campo1) return false
      return true
    } // es una funcion que se ejecuta cuando los props o estados del componente cambian 
    
    componentDiUpdate // funcionan para el segundo render en adelante

    componentWillUnmount // es una funcion que se ejecuta cuando el componente se destruye 
      // apagar listener
      // desuscribirse

  Ciclo de vida con hooks:
    render: toda el cuerpo de la funcion
    
    [a,b]: array de dependencias

    useEffect(() => {
      // cuerpo de funcion. Se ejecuta cada vez que alguna de las variables que se 
      // encuentran dentro del array de depencias sufre algun cambio

      return () => {
        // cuerpo de funcion que se ejecuta cada vez que el useEffect se desarma
      }
    }, [a, b])

    componentDidMount: 
      useEffect(() => {
        function()
      }, [])

    componenteWillUnmount:
      useEffect(() => {
        const listener = window.addEventListener('resize', () => {
          console.log("bla")
        })
        return () => {
          removeAddEventListener(listener)
        }
      }, [])

    componenteDidUpdate:
      useEffect(() => {
        // cuerpo de funcion. Se ejecuta cada vez que alguna de las variables que se 
        // encuentran dentro del array de depencias sufre algun cambio
      }, [a, b]) // shouldComponenteUpdate
*/

const Hijo = () => {
  // useEffect(() => {
  //   console.log("mount");

  //   return () => {
  //     console.log("unmount");
  //   };
  // }, []);

  return <div>Hijo</div>;
};

const HijoDeHijoDeHijo2 = () => {
  const context = useContext(Context);

  return <div>HijoDeHijoDeHijo2 {context.count}</div>;
};

const HijoDeHijo2 = () => {
  return <HijoDeHijoDeHijo2 />;
};

const Hijo2 = memo(({ campo, gritar }) => {
  // console.log("hola papi", campo);
  return (
    <div>
      Hijo2
      <button onClick={gritar}>Gritar: AHHHHH!</button>
      <HijoDeHijo2 />
    </div>
  );
});

const useAlgo = () => {
  useEffect(() => {}, []);

  return {
    value: "1"
  };
};

const Clase2 = () => {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const { value } = useAlgo();

  console.log("value", value);

  const change = (dir) => () => setCount((prev) => prev + dir);

  const campo = useMemo(() => {
    return {};
  }, []);
  const change2 = (dir) => () => setCount2((prev) => prev + dir);

  // useEffect(() => {
  //   console.log("count", count);
  // }, [count]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("ref.current", ref.current);
  //     ref.current.click();
  //   }, 5000);
  // }, []);

  const gritar = useCallback(() => {
    console.log("AHHHHHHHHHHHHHHHHHHHHH!");
    console.log("count", count);
  }, [count2]);

  return (
    <Context.Provider
      value={{
        count
      }}
    >
      <div>{count}</div>
      {count === 0 && <Hijo />}
      <Button onClick={change(-1)}>Disminuir</Button>
      <Button ref={ref} onClick={change(1)}>
        Aumentar
      </Button>

      <Button onClick={change2(-1)}>Disminuir2</Button>
      <Button ref={ref} onClick={change2(1)}>
        Aumentar2
      </Button>
      <Hijo2 campo={campo} gritar={gritar} />
    </Context.Provider>
  );
};

export default Clase2;
