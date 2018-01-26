import React, { Component, PropTypes } from "react"

export const ShowList = ({ showDesc, closeDesc, number, id, name, iconImages, mediumImages, address, locality, description, lat, long, locationType, phoneNumber, website, descState, region }) => {


  const desc = () => {
    showDesc(id)
  }

  const close = () => {
    closeDesc(id)
  }

  const normalList = () => {
    return (
      <li className="list-group-item ">
        <span className="icon col-lg-2"><img src={iconImages} /></span>
        <span className="listText col-lg-2">{name}</span>
        <span className="listText col-lg-2">{address}</span>
        <span className="listText col-lg-2">{locality}</span>
        <span className="listText col-lg-2">{region}</span>
        <button className="btn btn-primary descBtn col-lg-2 pull-right" onClick={desc}>See Description</button>
      </li>
    )
  }

  const descList = () => {
   
    return (
      <li className="list-group-item showDesc">
        <div className="descText"><img src={mediumImages} /></div>
        <div className="descText"><h3>{name}</h3></div>
        <div className="descText" ><p>{description}</p>
          <p className="descText2">Location Type:  {locationType}</p>
          <p className="descText2">Address: {address}</p>
          <p className="descText2">Phone Number: {phoneNumber}</p>
          <p><a href={"https://maps.google.com/?q=" + lat +"," + long} className="web">go to google maps</a></p>
          <a href={website} className="web">{website}</a>
          <button className="btn btn-block btn-link" onClick={close}><h4>Close</h4></button>
        </div>
      </li>
    )
  }

  return (
    (!descState) ? normalList() : descList()
  )
}

// ShowList.propTypes = {
// 	iconImage: PropTypes.string.isRequired,
// 	name: PropTypes.string.isRequired,
// 	address: PropTypes.string.isRequired,
// 	locality: PropTypes.string.isRequired
// }


