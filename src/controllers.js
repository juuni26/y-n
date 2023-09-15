const { nanoid } = require('nanoid');
const notes = require('./notes')

const addNote = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newObj = {
    id,
    createdAt,
    updatedAt,
    title,
    tags,
    body,
  };
  notes.push(newObj);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getNotes = (request, h) => ({
  status: 'success',
  data: {
    notes,
  },
});

// server.route({
//   method: 'GET',
//   path: '/notes/{id?}',
//   handler(request, h) {
//     const newNotes = notes.filter((data) => data.id === request.params.id);
//     if (newNotes) {
//       const responseSuccess = {
//         status: 'success',
//         data: {
//           notes: newNotes,
//         },
//       };
//       return h.response(responseSuccess).code(200);
//     }
//     const response = {
//       status: 'fail',
//       message: 'Catatan tidak ditemukan',
//     };
//     return h.response(response).code(404);
//   },
// });

// server.route({
//   method: 'PUT',
//   path: '/notes/{id?}',
//   handler(request, h) {
//     const findNote = notes.filter((data) => data.id === request.params.id);
//     if (findNote.length === 0) {
//       const response_fail = {
//         "status": "fail",
//         "message": "Gagal memperbarui catatan. Id catatan tidak ditemukan"
//       }
//       return h.response(response_fail).code(404)
//     }

//     const newNotes = notes.map((data) => {
//       if (data.id === request.params.id) {
//         return {
//           id: data.id,
//           createdAt: data.createdAt,
//           updatedAt: data.updatedAt,
//           title: request.body.title,
//           tags: request.body.tags,
//           body: request.body.body,
//         }
//       }
//       else {
//         return data
//       }
//     });
//     notes = newNotes;
//     if (newNotes) {
//       const responseSuccess = {
//         status: 'success',
//         message: 'Catatan berhasil diperbaharui'
//       };
//       return h.response(responseSuccess).code(200);
//     }
//   },
// });

// server.route({
//   method: 'DELETE',
//   path: '/notes/{id?}',
//   handler(request, h) {
//     const findNote = notes.filter((data) => data.id === request.params.id);
//     if (findNote.length === 0) {
//       const response_fail = {
//         "status": 'fail',
//         "message": 'Catatan gagal dihapus. Id catatan tidak ditemukan'
//       }
//       return h.response(response_fail).code(404)
//     }

//     const newNotes = notes.filter((data) => data.id != request.params.id);
//     notes = newNotes;
//     const responseSuccess = {
//       status: 'success',
//       message: 'Catatan berhasil dihapus'
//     };
//     return h.response(responseSuccess).code(200);
//   },
// });

// server.route({
//   method: 'GET',
//   path: '/notes',
//   handler: (request, h) => {
//     try {
//       const response = {
//         status: 'success',
//         data: {
//           notes,
//         },
//       };
//       return h.response(response).code(200);
//     } catch (err) {
//       const error = {
//         status: 'error',
//         message: 'Error server',
//       };
//       return h.response(error).code(500);
//     }
//   },
// });


module.exports = { addNote,getNotes }