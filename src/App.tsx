import axios from 'axios'
import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { User } from './types';
import UsersList from './components/UsersList';

function App() {
  enum SortBy{
    NONE= 'none',
    NAME= 'name',
    LAST= 'last',
    COUNTRY= 'country'
  }

  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
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
  //ESTO DE ARRIBA VAMOS A USARLO CON LA FUNCION SORTCOUNTRY
  const [filterCountrySearchBar, setFilterCountrySearchBar] = useState<string | null>(null);

  const toggleColors = () => {
    setShowColors(!showColors);
  }
  const sortCountry = () => {
    //Hay que recordar que el operador ternario siempre retorna algo, en este caso se evalua y si es verdadero retorna
    //SortBy.COUNTRY, si es falso retorna SortBy.NONE, hacia donde lo retorna? Hacia la variable newSorting
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    console.log(newSorting);
    setSorting(newSorting);
    // setSortByCountry(prevState => !prevState);
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

  //Ahora teniendo filteredUsers, en la funcion de abajo de sortedUsers, cuando vamos a hacer el sort, ya no lo haremos sobre
  //[...users], ahora sera sobre filteredUsers
  // const filteredUsers = filterCountrySearchBar ? users.filter(el => el.location.country.toLowerCase().includes(filterCountrySearchBar.toLowerCase())) : users;
  //Aqui arriba usamos mejor el includes() en vez del === ya que con el includes con tan solo poner una palabra comenzara el filtrado
  //en vez de si ponemos el === osease users.filter(el => el.location.country.toLowerCase() === filterCountrySearchBar.toLowerCase()))
  //este solo funcionara y escribimos TODO el nombre del pais, osea si ponemos ger, no aparecera nada en la lista, hasta poner germany
  //es donde ya aparecera algo

  //Aqui en el sort, el sort nos muta el array original, por eso usamos el spread en users (osease [...users])
  //Aparte con el sort y dandole una funcion y usando localCompare dentro de esa funcion nos va a hacer sort al country
  //Si sortByCountry es true entonces haz el sort, de otra manera pasale los users tal cual estan
  // const sortedUsers = sortByCountry ? [...users].sort((a,b) => {
  //   return a.location.country.localeCompare(b.location.country);
  // }) : users;
  //Esto de arriba se lo pasamos al componente UsersList

  // const sortedUsers = sortByCountry ? [...filteredUsers].sort((a,b) => {
  //   return a.location.country.localeCompare(b.location.country);
  // }) : filteredUsers; //<-----------Este es para que si no esta activo el boton de ordenar por pais igual se pueda filtrar al teclear

  //Usando useMemo para evitar renderizados

  const filteredUsers = useMemo(()=>{
    return filterCountrySearchBar ? users.filter(el => el.location.country.toLowerCase().includes(filterCountrySearchBar.toLowerCase())) : users;

  },[users, filterCountrySearchBar]) 

  //Esta funcion de abajo nos daba problemas debido a que no habiamos puesto un return explicito, osease todo se evaluaba
  //con puros ifs, pero nada que no fuera un IF, entonces solo se corrigio mas abajo estableciendo que si ninguno de esos
  //ifs era, entonces retornaba los filteredUsers
  //-------------------------------MAL----------------------------
  // const sortedUsers = useMemo(()=>{
  //   if(sorting === SortBy.NONE) return filteredUsers
  //   if(sorting === SortBy.COUNTRY) {return [...filteredUsers].sort((a,b) => {
  //     return a.location.country.localeCompare(b.location.country);
  //   })}
  //   if(sorting === SortBy.NAME){ return [...filteredUsers].sort((a,b) => {
  //     return a.name.first.localeCompare(b.name.first);
  //   })}
  //   if(sorting === SortBy.LAST){ return [...filteredUsers].sort((a,b) => {
  //     return a.name.last.localeCompare(b.name.last);
  //   })}
  // },[filteredUsers, SortBy.COUNTRY, SortBy.NAME, SortBy.LAST, sorting]) 
  
  //---------------------------------BIEN--------------------------
  const sortedUsers = useMemo(()=>{
    if(sorting === SortBy.COUNTRY) {return [...filteredUsers].sort((a,b) => {
      return a.location.country.localeCompare(b.location.country);
    })}
    if(sorting === SortBy.NAME){ return [...filteredUsers].sort((a,b) => {
      return a.name.first.localeCompare(b.name.first);
    })}
    if(sorting === SortBy.LAST){ return [...filteredUsers].sort((a,b) => {
      return a.name.last.localeCompare(b.name.last);
    })}
    return filteredUsers
  },[filteredUsers, SortBy.COUNTRY, SortBy.NAME, SortBy.LAST, sorting]) 

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort); //aqui cambia el valor de sorting, entonces se ejecuta la funcion de arriba
  }

  return (
    <>
      <div>
        <h1>Prueba Tecnica Tablas</h1>
        <header>
          <button onClick={toggleColors}>Colorear Filas</button>
          <button onClick={sortCountry}>{sorting === SortBy.COUNTRY ? 'No Ordenar por Pais' : 'Ordenar por Pais'}</button>
          <button onClick={handleReset}>Resetear Usuarios</button>
          <input onChange={e => setFilterCountrySearchBar(e.target.value)} type="search" placeholder='Filtra por Pais' />
        </header>
        <main>
          <UsersList handleChangeSort={handleChangeSort} handleDelete={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
