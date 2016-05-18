import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

// Eventually this will come from the server
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

ReactDOM.render(<CommentBox data={data}/>, document.getElementById('content'));
