import React from 'react'

const toCelsius = f => (f - 32) * 5 / 9
const toFahrenheit = c => (c * 9 / 5) + 32

const tryConvert = (v, conv) => {
  const input = parseFloat(v)
  if(Number.isNaN(input)) {
    return ''
  }
  const output = conv(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

const scaleNames = {
  c: '摂氏',
  f: '華氏'
}

class TemperatureInput extends React.Component {
  constructor(p) {
    super(p)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    const v = this.props.value
    const s = this.props.scale
    return (
      <fieldset>
        <legend>{scaleNames[s]}温度を入力してください:</legend>
        <input value={v} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

const BoilingVerdict = p =>
  p.celsius >= 100 ?
    <p>水が沸騰します.</p> :
    <p>水は沸騰しません.</p>

export class Calculator extends React.Component {
  constructor(p) {
    super(p)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.state = {value: '', scale: 'c'}
  }

  handleCelsiusChange(v) {
    this.setState({scale: 'c', value: v})
  }

  handleFahrenheitChange(v) {
    this.setState({scale: 'f', value: v})
  }

  render() {
    const s = this.state.scale
    const v = this.state.value
    const ce = s === 'f' ? tryConvert(v, toCelsius) : v
    const fa = s === 'c' ? tryConvert(v, toFahrenheit) : v
    return (
      <div>
        <TemperatureInput scale="c" value={ce} onChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" value={fa} onChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(ce)} />
      </div>
    )
  }
}
