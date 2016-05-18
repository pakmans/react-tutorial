import React from 'react';
import marked from 'marked';

// Stateful component (defined as a class):
export default class CommentBox extends React.Component {

  // For ES6 classes, getInitialState has been deprecated in favor of declaring
  //  an initial state object in the constructor
  constructor(props, context) {
    super(props, context);
    this.state = {data: []};
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
        <CommentForm />
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
  render() {
    return (
      <div className="commentForm">
      Hello, world! I am a CommentForm.
        </div>
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

