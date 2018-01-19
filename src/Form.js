import React, { Component } from "react"


export const Form = ({onSubmit, onCityChange, onZipChange, onNameChange, city, zip, name, names}) => {

  let _names, _zip, _city, _radius;

  const submit = (e) => {
    e.preventDefault()
    onSubmit()
  }



  return (
    <form onSubmit = {submit}>
    <table className="table col-lg-12">
      <tbody>
        <tr>
          <td>
            <label htmlFor="searchCity">Search by City</label>
            <input 
              type="text"
              value = {city}
              className="form-control inputs"
              id="searchCity" 
              onChange = {onCityChange}/>
          </td>
          <td>
            <label htmlFor="searchZIP">Search by ZIP</label>
            <input 
              type="text"
              value = {zip}
              className="form-control inputs"
              id="searchZIP"
              onChange = {onZipChange} />
          </td>
          <td>
            <button className="btn btn-success btn-block form-control" id="submit">
              Search
                </button>
          </td>
        </tr>
      </tbody>
    </table>
    </form>
  )
}
