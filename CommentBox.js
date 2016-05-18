import React from 'react';

// Stateful component (defined as a class):
class CommentBox extends React.Component {
    render() {
        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox.
          </div>
        );
    }
}

// Alternative statless component (defined as a function):
// const CommentBox = () => <div className="commentBox">Hello, world! I am a CommentBox.</div>

export default CommentBox
