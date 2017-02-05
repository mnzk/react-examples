import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
  splitPane: {
    height: 50,
    margin: 1
  },
  splitLeft: {
    float: 'left',
    width: '30%',
    height: '100%',
    backgroundColor: 'lightblue'
  },
  splitRight: {
    height: '100%',
    backgroundColor: 'lightgreen'
  }
})

const FancyBorder = p =>
  <div className={'FancyBorder FancyBorder-' + p.color} >
    {p.children}
  </div>

const WelcomeDialog = p =>
  <FancyBorder color="blue">
    <h1 className="Dialog-title">
      ようこそ
    </h1>
    <p className="Dialog-message">
      Thank you for visiting our spacecraft!
    </p>
  </FancyBorder>

const Contracts = p =>
  <div>Contracts</div>

const Chat = p =>
  <div>Chat</div>

const SplitPane = p =>
  <div className={css(styles.splitPane)}>
    <div className={css(styles.splitLeft)}>
      {p.left}
    </div>
    <div className={css(styles.splitRight)}>
      {p.right}
    </div>
  </div>

export const App09 = p =>
  <div>
    <SplitPane left={<Contracts />} right={<Chat />} />
  </div>
