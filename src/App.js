import React, { Component } from "react"
import "./style.css"
import { Form } from "./Form.js"
import { List } from "./List.js"
import axios from "axios"

const textStyle = {
  textAlign: "center"
}

const divStyle = {
  backgroundColor: "white",
  border: "solid #333333"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      cityInput: "",
      zipInput: "",
      nameInput: "",
      data: [],
      currentPages: "",
      numberOfPages: "",
      totalResults: "",
      showList: false,
      hasError: false
    }
    this.showDescription = this.showDescription.bind(this);
    this.closeDescription = this.closeDescription.bind(this);
    this.addBool = this.addBool.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleName = this.handleName.bind(this);
    this.inputSearch = this.inputSearch.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  

  inputSearch(search) {
    const key = "278bf3d4ead6129ce614dda7c6de6682"
    axios.get("http://api.brewerydb.com/v2/"+search+"&key="+key)
    .then(response => {
      console.log(response.data.data)
      // console.log(response.data.totalResults)
      this.setState({
        data: response.data.data,
        currentPages: response.data.currentPage,
        numberOfPages: response.data.numberOfPages,
        totalResults: response.data.totalResults,
        cityInput: "",
        zipInput: "",
        nameInput: "",
      });
    })
    .catch(error => {
      console.log("Error fetching data", error);
    });
  }


  handlePage(i) {
    
    let page = "&p="+i;
    let currentSearch = this.state.input;
    let newSearch = currentSearch + page;
    this.inputSearch(newSearch);
  }


  handleSubmit() {
    
    let search, cityInput, zipInput, nameInput;

    if (this.state.zipInput === "" && this.state.nameInput === "") {
      cityInput = this.state.cityInput
      search = "locations?locality="+cityInput
    }
    if (this.state.cityInput === "" && this.state.nameInput === "") {
      zipInput = this.state.zipInput
      search = "locations?postalCode="+zipInput
    }
    if (this.state.zipInput === "" && this.state.cityInput === "") {
      nameInput = this.state.nameInput
      search = "search?q="+nameInput+"&type=brewery&withBreweries=y"
    }
    this.setState({
      showList: true,
      input: search      
    })
    this.inputSearch(search);
  }

  handleCity(e) {    
    this.setState({cityInput: e.target.value})    
  }
  handleZip(e) {
    this.setState({zipInput: e.target.value})
  }
  handleName(e) {
    this.setState({nameInput: e.target.value})
  }
  
componentDidMount() {
  
}

 

  addBool() {
    this.setState({
      data: this.state.data.map((show) => {
        return {
          ...show,
          showDesc: false
        }
      })
    })
  }


  showDescription(id, bool) {
    this.setState({
      data: this.state.data.map((show) => {
        if (id === show.id) {
          return {
            ...show,
            showDesc: true
          }
        }
        return show;
      })
    })
    

  }

  closeDescription(id, bool) {
    this.setState({
      data: this.state.data.map((show) => {
        if (id === show.id) {
          return {
            ...show,
            showDesc: false
          }
        }
        return show;
      })
    })

  }

  

    showResults() {
      return (
        <List
            page = {this.handlePage.bind(this)}
            current = {this.state.currentPages}
            pages = {this.state.numberOfPages}
            results = {this.state.totalResults}
            handleClose={this.closeDescription}
            handleDesc={this.showDescription}
            showList={this.state.showList}
            currentSearch={this.state.data} />
      )
    }

    showError() {
      return (
        <div style = {divStyle}><h3><p style={textStyle}>.... Sorry We Could Not Find Any Results</p></h3></div>
      )
    }
  


  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>... ummm something Went Wrong</h1>
      // console.log(this.state.currentPages)
      // console.log(this.state.numberOfPages)
      // console.log(this.state.totalResults)
    }
    return (
      <div>
        <header className="header col-lg-12">
          <h1>Find My Brewery</h1>

          <div id="h4"><h4>simple app to find your favorite breweries</h4></div>
        </header>
        <div className="container">
        <div className="row">
          <div className = "form-group">
          <Form
            names={this.state.names}
            city = {this.state.cityInput}
            name = {this.state.nameInput}
            zip = {this.state.zipInput}
            onSubmit = {this.handleSubmit}
            onCityChange = {this.handleCity}
            onZipChange = {this.handleZip}
            onNameChange = {this.handleName}
          />
          </div>
        </div>
        <div className="row">
          {(this.state.data === undefined) ? this.showError() : this.showResults()}
        </div>

      </div>
      </div>
    )
  }
}

export default App;