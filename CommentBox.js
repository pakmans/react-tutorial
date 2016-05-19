import React from 'react';
import marked from 'marked';

// Stateful component (defined as a class):
export default class CommentBox extends React.Component {

  // For ES6 classes, getInitialState has been deprecated in favor of declaring
  //  an initial state object in the constructor
  constructor(props, context) {
    super(props, context);
    this.state = {data: []};
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  loadCommentsFromServer() {
    // Using github's fetch polyfill instead of jQuery
    fetch(this.props.url, {
    }).then(res => {
        return res.json();
    }).then(data => {
      this.setState({data: data});
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    fetch(this.props.url, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      this.setState({data: data});
    }, err => {
      this.setState({data: comments});
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    // The original tutorial is missing the bind(this)
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

// Alternative statless component (defined as a function):
// const CommentBox = () => <div className="commentBox">Hello, world! I am a CommentBox.</div>
// export default CommentBox

class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {author: '', text: ''};
    // React doesn't auto bind this on non-react methods:
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault(); // prevent the browser's default action of submitting the form:
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit} >
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange} />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange} />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

class Comment extends React.Component {

  rawMarkup() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="comment">
      <h2 className="commentAuthor">
      {this.props.author}
      </h2>
      <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  };
}

