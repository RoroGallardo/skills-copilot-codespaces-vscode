// Create web server application with Express
// Run using Node.js: node comments.js
// Run on browser: http://localhost:8081/comments.html

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var comments = [
  { id: 1, author: 'Pete Hunt', text: 'This is one comment' },
  { id: 2, author: 'Jordan Walke', text: 'This is *another* comment' }
];

var currentId = 2;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/comments.json', function(req, res) {
  res.setHeader('Cache-Control', 'no-cache');
  res.json(comments);
});

app.post('/comments.json', function(req, res) {
  var comment = req.body;
  comment.id = ++currentId;
  comments.push(comment);
  res.setHeader('Cache-Control', 'no-cache');
  res.json(comment);
});

app.listen(8081);

// Path: comments.html
// <html ng-app="commentsApp">
// <head>
//     <meta charset="utf-8">
//     <title>Comments</title>
//     <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js"></script>
//     <script src="comments.js"></script>
// </head>
// <body>
//     <div ng-controller="CommentController">
//     <div class="commentForm">
//         <h2>Comments:</h2>
//         <div ng-repeat="comment in comments">
//         <h3>{{comment.author}}</h3>
//         <p>{{comment.text}}</p>
//         </div>
//         <form ng-submit="addComment()">
//         <input type="text" ng-model="comment.author" placeholder="Your name" /><br />
//         <input type="text" ng-model="comment.text" placeholder="Say something..." /><br />
//         <input type="submit" value="Post" />
//         </form>
//     </div>
//     </div>
// </body>
// </html>
// 
// Path: comments.js
// var commentsApp = angular.module('commentsApp', []);
// commentsApp.controller('CommentController', function ($scope, $http, $interval) {
//   $scope.comments = [];
//   $scope.comment = {};
//   $scope.newComment = {};
//   $interval(function() {
//     $http.get('/comments.json').success(function(data) {
//       $scope.comments = data;
//     });
//   }, 500);
//   $scope.add