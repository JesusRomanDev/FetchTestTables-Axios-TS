import axios from 'axios'
import './App.css'
import { useEffect, useRef, useState } from 'react'
import { User } from './types';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  //Este estado de abajo es para cuando se le da click al boton y queremos resetear los usuarios eliminados(como estaban al inicio)
  //En conjunto con la funcion handleReset y activandolo en el useEffect cuando carga nuestro componente
  //useRef es para guardar un valor que queremos que se comparta entre renderizados pero que al cambiar(si es que cambia o lo mandamos cambiar con algo asi ref.current = nuevoValor), no vuelva a renderizar el 
  //componente
  //Recordando que para acceder al valor de la referencia es ref.current o para CAMBIARLA variable.current = xxx
  //Osease, ACCEDIENDO ref.current o CAMBIANDOLA ref.current = xxx
  //useRef PRESERVA EL VALOR ENTRE RENDERIZADOS
  const originalUsers = useRef<User[]>([]);
  //Considerando usar el valor anterior
  //Para mas info ir a https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state
  //En el caso de toggleColors no fue necesario usar el pending state asi como lo vemos abajo
  // const [numbers, setNumbers] = useState(false);
  // const toggleNumber = () => {
  //   setNumbers(number => !number);
  // }
  const toggleColors = () => {
    setShowColors(!showColors);
  }
  const sortCountry = () => {
    setSortByCountry(!sortByCountry);
  }

  const handleDelete = (email: string) : void => {
    const updatedUsers = users.filter((user) => {
      return user.email !== email
    })
    console.log(updatedUsers);
    setUsers(updatedUsers);
  }

  const handleReset = () => {
    setUsers(originalUsers.current);
  }
  
  useEffect(()=>{
    axios.get('https://randomuser.me/api/?results=20')
    .then(response => {
      // console.log(response.data)
      const {results} = response.data;
      setUsers(results);
      // console.log(results);
      //Para conservar el estado inicial usaremos el originalUsers.current = ....
      originalUsers.current = results;
    })
    .catch(error => console.log(error))
  }, [])

  //Aqui en el sort, el sort nos muta el array original, por eso usamos el spread en users (osease [...users])
  //Aparte con el sort y dandole una funcion y usando localCompare dentro de esa funcion nos va a hacer sort al country
  //Si sortByCountry es true entonces haz el sort, de otra manera pasale los users tal cual estan
  const sortedUsers = sortByCountry ? [...users].sort((a,b) => {
    return a.location.country.localeCompare(b.location.country);
  }) : users;
  //Esto de arriba se lo pasamos al componente UsersList

  return (
    <>
      <div>
        <h1>Prueba Tecnica Tablas</h1>
        <header>
          <button onClick={toggleColors}>Colorear Filas</button>
          <button onClick={sortCountry}>{sortByCountry ? 'No Ordenar por Pais' : 'Ordenar por Pais'}</button>
          <button onClick={handleReset}>Resetear Usuarios</button>
        </header>
        <main>
          <UsersList handleDelete={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
