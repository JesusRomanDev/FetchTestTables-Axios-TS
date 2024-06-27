import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react'
import { User } from './types';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
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
  
  useEffect(()=>{
    axios.get('https://randomuser.me/api/?results=100')
    .then(response => {
      // console.log(response.data)
      const {results} = response.data;
      setUsers(results);
      // console.log(results);
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
        </header>
        <main>
          <UsersList handleDelete={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
