import React from 'react';

// Stateful component (defined as a class):
class CommentBox extends React.Component {
    render() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList />
            <CommentForm />
          </div>
        );
    }
}

// Alternative statless component (defined as a function):
// const CommentBox = () => <div className="commentBox">Hello, world! I am a CommentBox.</div>

class CommentList extends React.Component {
    render() {
        return (
          <div className="commentList">
            Hello, world! I am a CommentList.
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

export default CommentBox
