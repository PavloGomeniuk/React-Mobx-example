import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {decorate, observable} from "mobx";
import {observer} from "mobx-react";
import {configure} from "mobx";
import {action} from "mobx";
import {computed} from "mobx";

configure({enforceActions: true})


class Store {
  employeesList = [
    {name: "Pavlo Gomeniuk", salary: 850},
    {name: "Alexandra Gomeniuk", salary: 425},
  ]
  clearList() {
    this.employeesList = []
  }

  pushEmployee(e) {
    this.employeesList.push(e)
  }

   get totalSum() {
    let sum = 0
    this.employeesList.map( e => sum = sum + e.salary)
    return sum
  }

   get highEarnersCount () {
    return this.employeesList.filter( e => e.salary > 500).length
  }
}

decorate(Store, {
  employeesList: observable,
  clearList: action,
  pushEmployee: action,
  totalSum: computed
})

const appStore = new Store()

class Table extends Component {
    render() {
       const {store} = this.props
       return(
          <div>
            <div>
              {this.props.store.employeesList.map((e, i) =>
                <ul className="ul-1">
                  <li>{e.name}</li>          
                  <li>{e.salary}</li>  
                </ul>
              )}
              <tbody>
                <tr>
                  <td>TOTAL:</td>
                  <td>{store.totalSum}</td>
                </tr>
          </tbody>
            </div>
            <div className="fade">
            You have <u>{store.highEarnersCount} team members </u>that earn more that 500$/day.
            </div>
          </div>
        )
    }
}

Table = observer(Table)

class Controls extends Component {
  addEmployee = ()=> {
    const name = prompt("The name:")
    const salary = parseInt(prompt("The salary:"), 10)
    this.props.store.pushEmployee({name, salary})
  }

  clearList = ()=> {
    this.props.store.clearList()
  }
  render() {
    return(
      <div className="controls">
        <button onClick={e=>this.clearList()}>clear table</button>
        <button onClick={e=>this.addEmployee()}>add record</button>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="main">
        <Table store={appStore} />
        <Controls store={appStore} />
      </div> 
    )
  }
}

export default App;