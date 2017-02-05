import React from 'react'
import { render } from 'react-dom'

// import LoginControl from './example01'
// import Page from './example02'
// import Ex03 from './example03'
// import Blog from './example04'
// import { db } from './example04'
// import NameForm from './example05'
// import FlavorForm from './example06'
// import Reservation from './example07'
// import { Calculator } from './example08'
// import { App09 } from './example09'

import { FilterableProductTable } from './example10'

const sections =
    <FilterableProductTable />

{/*const sections =
  <div>
    <FilterableProductTable />
    <hr />
    <App09 />
    <hr />
    <Calculator />
    <hr />
    <Reservation />
    <hr />
    "FlavorForm"
    <hr />
    <NameForm />
    <hr />
    <LoginControl />
    <hr />
    <Page />
    <hr />
    <Ex03 items={["AAAA","BBBB","あああ"]}/>
    <hr />
    <Blog posts={db.posts} />
  </div>;*/}

render (
  sections,
  document.querySelector(".content")
);
