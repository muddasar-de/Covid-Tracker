import React, { useEffect, useState } from 'react';
import './covid.css';
const Covid = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const getDataFromApi = async () => {
    try {
      const response = await fetch(
        'https://coronavirus-19-api.herokuapp.com/countries'
      );
      // console.log(data);
      const jsonData = await response.json();
      console.log('data fetched');

      setData(jsonData);
    } catch (err) {
      console.error('not datas');
    }
  };

  const getSearchedTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  document.title = 'Muddasir';
  useEffect(() => {
    console.log('rendered');
    getDataFromApi();
  }, []);

  return (
    <>
      <section className='main'>
        <div className='card'>
          <h1>cases</h1>
          {/* {data ? console.log(data) : console.log('hi')} */}
          <p>{data.cases}</p>
        </div>
        <div className='searchSection'>
          <label>Search Country</label>

          <input
            type='text'
            placeholder='Enter the country name...'
            onChange={getSearchedTerm}></input>
        </div>
        <div className='responsive-table'>
          <table className='table table-hover table-bordered '>
            <thead className='thead-dark'>
              <tr>
                <th> Country </th>
                <th> Cases </th>
                <th> Today Cases </th>
                <th> Deaths </th>
                <th> Today Deaths </th>
                <th> Recovered </th>
                <th> Active </th>
                <th> Critical </th>
                <th> Total Tests </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((currentObject) => {
                  if (
                    currentObject.country
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    // console.log('hello', currentObject);
                    return currentObject;
                  } else {
                    console.log('not matched');
                  }
                })
                .map((curElement, idx) => {
                  return (
                    <tr key={idx}>
                      <td> {curElement.country}</td>
                      <td> {curElement.active} </td>
                      <td> {curElement.todayCases} </td>
                      <td> {curElement.deaths} </td>
                      <td> {curElement.todayDeaths} </td>
                      <td> {curElement.recovered} </td>
                      <td> {curElement.active} </td>
                      <td> {curElement.critical} </td>
                      <td> {curElement.totalTests} </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default Covid;
