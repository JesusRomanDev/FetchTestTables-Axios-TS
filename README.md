# Prueba
The objective of this technical test is to create a similar application to the one provided in this link: https://xxxxx. To achieve this, you must use the API provided by https://randomuser.me/.
Here are the steps to follow:
- [] Fetch 100 or 20 rows of data using the API.
- [] Display the data in a table format, similar to the example.
- [] Provide the option to color rows as shown in the example.
- [] Allow the data to be sorted by country as demonstrated in the example.
- [] Enable the ability to delete a row as shown in the example.
- [] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [] Handle any potential errors that may occur.
- [] Implement a feature that allows the user to filter the data by country.
- [] Avoid sorting users again the data when the user is changing filter by country.
- [] Sort by clicking on the column header.
- [] Provide a README.md file with instructions on how to run the application.

## Keys que aprendi
* Cuando dentro de una funcion comenzamos a usar algun if, a fuerzas debe haber un RETURN EXPLICITO, porque los ifs son implicitos, uno piensa que puede caer en esa opcion, pero si en ninguno de los ifs cae? Debe existir esa posibilidad, algun return fuera de todo if, de lo contrario nos daria error
* Usar useRef para almacenar un valor y que no cambie entre renderizados, y cuando usamos la funcion handleReset usar ese valor almacenado

* Como se estructura una table, primero va el atributo table luego thead y tbody, dentro de thead va un tr y dentro de tr va un th,
luego dentro de tbody va otro tr y dentro de tr va td
Explicación de los elementos:
table: Define el inicio de la tabla.
thead: Contiene el encabezado de la tabla.
tr: Define una fila en la tabla.
th: Define una celda de encabezado en una tabla.
tbody: Contiene el cuerpo de la tabla.
td: Define una celda de datos en la tabla. 

<table>
  <thead>
    <tr>
      <th>Encabezado 1</th>
      <th>Encabezado 2</th>
      <th>Encabezado 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Dato 1.1</td>
      <td>Dato 1.2</td>
      <td>Dato 1.3</td>
    </tr>
    <tr>
      <td>Dato 2.1</td>
      <td>Dato 2.2</td>
      <td>Dato 2.3</td>
    </tr>
    <tr>
      <td>Dato 3.1</td>
      <td>Dato 3.2</td>
      <td>Dato 3.3</td>
    </tr>
  </tbody>
</table>