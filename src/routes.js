const { addNote, getNotes } = require('./controllers');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNote,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getNotes,
  }
];


module.exports = routes;
