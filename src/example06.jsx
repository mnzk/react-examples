import React from 'react'

const items = [
  "Grapefruit",
  "Lime",
  "Coconut",
  "Mango",
  "Apple",
  "Orange",
  "Banana"
].sort()

export default class FlavorForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {value: 'coconut'}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event) {
    this.setState( {value: event.target.value} )
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value )
    event.preventDefault()
  }

  handleClick(event) {
    this.setState( {value2: this.state.value} )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite La Croix flavor:
            <select
                size={items.length}
                value={this.state.value}
                onChange={this.handleChange} >
              {
                items.map( it => <option value={it.toLowerCase()}>{it}</option>)
              }
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.handleClick}>TEST</button>
        <div>
          <input type="text" value={this.state.value2} />
        </div>
      </div>
    )
  }
}
