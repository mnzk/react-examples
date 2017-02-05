import React from 'react'

export default class Ex03 extends React.Component {
  constructor(props){
    super(props)
    const xs = props.items
      .map((x, i) => <li key={i.toString()}>{x}</li>);
    this.state = {
      listItems: xs,
      listCount: xs.length
    }
  }

  render(){
    return (
      <div>
        Count: {this.state.listCount}
        <ul>{this.state.listItems}</ul>
      </div>
    )
  }
}
