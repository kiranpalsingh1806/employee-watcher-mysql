import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState('');

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      wage: wage
    }).then(
      () => {
        setEmployeeList([...employeeList, {
          name: name,
          age: age,
          country: country,
          wage: wage
        }])
      }
    );
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    })
  }

  return (
    <div className="App">
      <div className='information'>
        <label>Name</label>
        <input type="text" onChange={(event) => { setName(event.target.value) }} />
        <label>Age</label>
        <input type="number" onChange={(event) => { setAge(event.target.value) }} />
        <label>Position</label>
        <input type="text" onChange={(event) => { setPosition(event.target.value) }} />
        <label>Country</label>
        <input type="text" onChange={(event) => { setCountry(event.target.value) }} />
        <label>Wage</label>
        <input type="text" onChange={(event) => { setWage(event.target.value) }} />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div className='employees'>
        <button onClick={getEmployees}>Show Employee</button>

        {
          employeeList.map((val, key) => {
            return (
              <div className='employee'>
                <h4>Name : {val.name}</h4>
                <h4>Age : {val.age}</h4>
                <h4>Country : {val.country}</h4>
                <h4>Wage : {val.wage}</h4>
              </div>
            );
          })
        }
      </div>

    </div >
  );
}

export default App;
