import React, { Component } from 'react';
import Header from './components/Header';
import Source from './components/source/Source';
import Target from './components/target/Target';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import './App.scss';

class App extends Component {
  constructor(){
    super();
    this.state = {
      components: []
    }
    this.onDrop = this.onDrop.bind(this);
    this.handleSave = this.handleSave.bind(this);
     this.handleClear = this.handleClear.bind(this);
  }


  handleSave(){
    const {components} = this.state
    localStorage.setItem('dropComponent', JSON.stringify(components));
      
  }
  
  handleClear(){
    localStorage.removeItem('dropComponent');
    this.setState({
      components: []
    })
  }
 
  componentDidMount(){

    const data= JSON.parse(localStorage.getItem('dropComponent'));

    if(!_.isUndefined(data) && !_.isEmpty(data)){
      this.setState({
        components: data
      })
    }
}
  
  
  onDrop(component){
    const { components } = this.state;
    console.log(component)
    const newComponentsList = _.concat([],components, component)
    
    this.setState({
      components: newComponentsList
    })
  }


  render() {
    const { components } = this.state;
    console.log('state components ', components)
    return (
    <>
      <Header />
      <div className="App">
        <Source/>
        <Target onDrop={this.onDrop} components={components}  
        handleSave={this.handleSave} handleClear={this.handleClear}/>
      </div>

    </>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
