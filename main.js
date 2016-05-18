import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

ReactDOM.render(<CommentBox url="/api/comments" pollInterval="5000" />, document.getElementById('content'));
