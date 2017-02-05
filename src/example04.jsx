import React from 'react'

export const db = {
  posts: [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'},
    {id: 3, title: 'テストXX', content: 'あいうえおかきくけこ'}
  ]
}

export default class Blog extends React.Component {
  constructor(props){
    super(props)
    this.state = {posts: props.posts}
  }

  createSidebar() {
    const items = this.state.posts.map(post =>
      <li key={post.id}>{post.title}</li>
    );
    return <ul>{items}</ul>;
  }

  createContent() {
    return this.state.posts.map(post =>
      <div key={post.id}>
        <h3># {post.title}</h3>
        <p>{post.content}</p>
      </div>
    )
  }

  render() {
    const sidebar = this.createSidebar();
    const content = this.createContent();
    return (
        <div>
          {sidebar}
          {content}
        </div>
    )
  }
}

