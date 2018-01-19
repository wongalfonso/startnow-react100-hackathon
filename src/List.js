import React, { Component, PropTypes } from "react"
import { ShowList } from "./ShowList"

const style = {
  textAlign: "right",
  paddingRight: "2em"
}

const Anchor = ({pageChange, id}) => {

  console.log(id);
  const change = () => {
    pageChange(id);
  }

  return (
    <a onClick = {change} >{" " + id + " "}</a>
  )
}


export class List extends Component {
  
  changePage = (id) => {
    this.props.page(id);
  }

  renderList = () => {
    // console.log(this.props.currentSearch)
    let iconImages, mediumImages, current;
    if (!this.props.currentSearch) {
      return null;
    }
    var arr = [];
    for (var i = 0; i < this.props.pages; i++) {
      arr[i] = i + 1;
    }

    

    return (

      <div>
        <div className="row">
        <h4><p className="col-lg-12" style={style}>
          Search Results:    {this.props.results}
          </p></h4>
          <h4><p className="col-lg-12" style={style}>
            Pages: {arr.map((num, i) => {
              // console.log(num);
              return (
                <Anchor
                  key={i}
                  id = {num}                
                  pageChange = {this.changePage}
                />
              )
            })}
          </p>
          </h4>
        </div>
        <ol className="list-group">
            <li className="list-group-item">
            <span className="col-lg-2 descText">Logo</span>
            <span className="col-lg-2 descText">Name</span>
            <span className="col-lg-2 descText">Location</span>
            <span className="col-lg-2 descText">City</span>
            <span className="col-lg-2 descText">State</span>
            <span className="col-lg-2 descText">Description</span>
            </li>
          
          <div>
            {this.props.currentSearch.map((data, i) => {

              iconImages = (typeof data.brewery.images === "object") ? data.brewery.images.icon : ""
              
              mediumImages = (typeof data.brewery.images === "object") ? data.brewery.images.medium : ""
              
              return (
                <ShowList
                  key={data.id}
                  id={data.id}
                  number={i}
                  showDesc={this.props.handleDesc}
                  closeDesc={this.props.handleClose}
                  descState={data.showDesc}
                  name={data.brewery.name}
                  description={data.brewery.description}
                  website={data.brewery.website}
                  locality={data.locality}
                  region={data.region}
                  iconImages={iconImages}
                  mediumImages={mediumImages}
                  established={data.brewery.established}
                  phoneNumber={data.phone}
                  lat={data.latitude}
                  long={data.longitude}
                  locationType={data.locationType}
                  address={data.streetAddress}
                />
              )
            })
            } 
            </div>                 
      </ol>
      </div>
    )
  }

  emptyList = () => {
    return (
      <div></div>
    )
  }

  render() {
    return (
      (this.props.showList) ? this.renderList() : this.emptyList()
    )
  }
}

// List.propTypes = {

// }