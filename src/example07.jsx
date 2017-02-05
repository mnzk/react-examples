import React from 'react'

export default class Reservation extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isGoing: true, numberOfGuests: 2 }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const targetg = event.target
    const value = target.type == 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState( { [name]: value } )
  }

  render() {
    return (
      <form>
        <label>
          Is Going:
          <input name="isGoing" type="checkbox"
              checked={ this.state.isGoing }
              onChange={ this.handleInputChange } />
          <br />
          <label>
            Number of guests:
            <input name="numberOfGuests" type="number"
                value={ this.state.numberOfGuests }
                onChange={ this.handleInputChange } />
          </label>
        </label>
      </form>
    )
  }
}
