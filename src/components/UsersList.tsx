import { User } from "../types"
//Aqui creamos esta interface con el nombre de Props porque estamos dicendole en los parametros del componente que 
//sera tipado siendo un User[] pero como se esta usando el destructuring es como si fueramos a destructurar tambien el type
//por eso se creo esa interface de Props, entonces destructurando de Props vamos a tener un users 
//Es como si tuvieramos en un componente llamado Guitarra({cualidades}), si le decimos que cualidades va a tener un type de 
//un array de objetos osease Guitarra({cualidades} : Object[]), no funcionaria ya que dentro de Object[] no existe una propiedad
//llamada cualidades, entonces algo asi seria 
//interface Props {cualidades: Object[]} entonces Guitarra({cualidades} : Props)
//Todo esto se debe a la destructuracion, sacamos users de la interface Props, entonces debe existir una propiedad llamada users
interface Props {
    users: User[];
    showColors: boolean;
    handleDelete: (email: string) => void
}
const UsersList = ({handleDelete, users, showColors}: Props) => {
    // console.log(users);
  return (
    <table width='100%'>
        <thead>
            <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Pais</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => {
                // console.log(index);
                //Asignando si el indice con modulo de 2 da 0 entonces se le aplica una clase u otra
                const backgroundColor = index % 2 === 0 ? '#333' : '#555';
                //Si showColors es true entonces aplicale ese color y asignaselo a la variable color
                const color = showColors ? backgroundColor : ''
            return (
                <tr style={{backgroundColor: color}} key={user.email}>
                    <td><img src={user.picture.thumbnail} alt="" /></td>
                    <td>{user.name.first}</td>
                    <td>{user.name.last}</td>
                    <td>{user.location.country}</td>
                    <td><button onClick={() => handleDelete(user.email)}>Borrar</button></td>
                </tr>
            )})}
        </tbody>
    </table>
  )
}

export default UsersList