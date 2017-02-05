import React from 'react'
import { StyleSheet, css } from 'aphrodite'

//const CURRENCY_MARK = '\u00a5 ' //yen mark
const CURRENCY_MARK = '$'

let PRODUCTS = [
  {category: "Electronics", price: 99.99, stocked: true, name: "iPod Touch"},
  {category: "Sporting Goods", price: 49.99, stocked: true, name: "Football"},
  {category: "Sporting Goods", price: 29.99, stocked: false, name: "Basketball"},
  {category: "Electronics", price: 399.99, stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: 110.99, stocked: true, name: "Nexus 5"},
  {category: "Sporting Goods", price: 9.99, stocked: true, name: "Baseball"},
  {category: "Electronics", price: 199.99, stocked: true, name: "Nexus 7"}
]

export class FilterableProductTable extends React.Component {
  constructor(p) {
    super(p)
    this.state = {
      filterText: '',
      isStockOnly: false
    }

    this.handleUserInput = (filterText, isStockOnly) => {
      this.setState( {
        filterText: filterText,
        isStockOnly: isStockOnly
      })
    }
  }

  render() {
    const st = this.state
    const view = 
      <div className={css(ss.boxMain)}>
        <SearchBar
          filterText={st.filterTes}
          isStockOnly={st.isStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={PRODUCTS}
          filterText={st.filterText}
          isStockOnly={st.isStockOnly}
        />
      </div>

    return view
  }
}

class SearchBar extends React.Component {
  constructor(p) {
    super(p)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.props.onUserInput(
      this.filterTextInput.value,
      this.isStockOnlyInput.checked
    )
  }

  render() {
    const cssCb = css(ss.blockCheckbox)
    const view =
      <form className={css(ss.boxSearch)}>
        名前
        <input
          type="text" placeholder="Search..."
          value={this.props.filterText}
          ref={input => this.filterTextInput = input}
          onChange={this.handleChange}
        />
        <div>
          <label className={cssCb}>
            <input
              type="checkbox" className={cssCb}
              checked={this.props.isStockOnly}
              ref={input => this.isStockOnlyInput = input}
              onChange={this.handleChange}
            />
            在庫のある製品のみ表示
          </label>
        </div>

      </form>

    return view
  }
}

class ProductTable extends React.Component {
  render() {
    // make filter pred
    let pred = null
    if( this.props.filterText && this.props.isStockOnly ) {
      pred = p =>
       -1 !== p.name.indexOf(this.props.filterText) &&
       p.stocked
    } else if( this.props.filterText ) {
      pred = p => -1 !== p.name.indexOf(this.props.filterText)
    } else if( this.props.isStockOnly ) {
      pred = p => p.stocked
    }

    // get view data
    const dataTree = this.convertToTableEntries(
      pred === null ?
        this.props.products :
        this.props.products.filter(pred)
    )

    // sort
    const compareByKey = (a, b) =>
      a.key === b.key ? 0 : (a.key > b.key ? 1 : -1)

    const rows = Object.keys(dataTree)
      .sort()
      .map(categoryKey => dataTree[categoryKey].category)
      .reduce((acc, cate) =>
        acc
          .concat( cate )
          .concat( dataTree[cate.key].rows.sort(compareByKey) )
        , [])

    // make DOM
    const view = 
      <div>
        <table className={css(ss.boxTable)}>
          <thead>
            <tr>
              <th>名前</th>
              <th>価格</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>

    return view
  }

  convertToTableEntries(products){
    // return Object is: Map<CategoryKey, Item>
    // Item = {
    //    category: ProductCategoryRow,
    //    rows: Array<ProductRow>
    // }

    return products.reduce((acc, p) => {
      // p is a product data
      const categoryKey = p.category.toLowerCase()
      let it = acc[categoryKey]
      if(!it){
        it = {
          category: <ProductCategoryRow category={p.category} key={categoryKey} />,
          rows: []
        }
        acc[categoryKey] = it
      }
      it.rows.push(<ProductRow product={p} key={p.name.toLowerCase()} />)
      return acc
    }, {})
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product
    if(!product) return null

    const stylesOfName = product.stocked ?
        ss.tdProductName :
        [ ss.tdProductName, ss.productNameForNoStocked ]

    const name = product.name
    const price = CURRENCY_MARK + product.price

    const view = 
      <tr>
        <td className={css(stylesOfName)}>{name}</td>
        <td className={css(ss.tdPrice)}>{price}</td>
      </tr>

    return view
  }
}

// local style utility
const mixin = (a, b) => Object.assign({}, a, b)

const defaultBorder = {
    borderStyle: 'solid',
    borderWidth: 1
}

// define local style
const ss = StyleSheet.create({
  boxMain: mixin( defaultBorder, {
    padding:5,
    width:250,
    borderColor:'red',
  }),
  boxSearch: mixin( defaultBorder, {
    borderColor:'blue',
    padding:5
  }),
  boxTable: mixin( defaultBorder, {
    borderColor:'green',
    width: '100%',
    marginTop: 5
  }),
  tdProductName: {
    margin: 5
  },
  productNameForNoStocked: {
    color: 'red'
  },
  tdPrice: {
    textAlign: 'right'
  },
  blockCheckbox: {
    cursor: 'pointer',
  }
})
