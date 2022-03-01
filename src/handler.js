const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id == id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil ditambahkan',
      data: { noteId: id },
    });

    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'gagal',
    message: 'catatan gagal ditambahkan',
  });
};


const getAllNotesHandler = (request,h) => {
  const response = h.response({
    status: 'success',
    data: { notes },
  });
  response.code(200);
  return response;
};

const getNoteByIdHandler = (request,h) => {
  const {id} = request.params;
  const note = notes.filter((n)=>n.id===id)[0];

  if(note!==undefined){
    const response = h.response({
      status: 'success',
      data: { note },
    });
    response.code(200);
    return response;

  }
  else{
    const response = h.response({
      status: 'fail',
      message:'note tidak ditemukan',
    });
    response.code(404);
    return response;

  };

};

const editNoteByIdHandler = (request,h) => {
  const {id} = request.params;
  const {title,tags,body} = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n)=> n.id===id);
  
  if(index!==-1){
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    };
    const response = h.response({
      status : 'success',
      message:'catatan berhasil diperbaharui'
    });
    response.code(200)
    return response;
  }else{
    const response = h.response({
      status : 'fail',
      message:'gagal memperbaharui catatan. Id tidak ditemukan'
    });
    response.code(404)
    return response;
  }
};

const deleteNoteByIdHandler = (request,h) => {
  const {id} = request.params;
  const index = notes.findIndex((n)=> n.id===id);

  if(index!==-1){
   
    notes.splice(index,1);
    const response = h.response({
      status : 'success',
      message:'catatan berhasil dihapus'
    });
    response.code(200)
    return response;
  }else{
    const response = h.response({
      status : 'fail',
      message:'gagal memperbaharui catatan. Id tidak ditemukan'
    });
    response.code(404)
    return response;
  }  
}

module.exports = {addNoteHandler,getAllNotesHandler,getNoteByIdHandler,editNoteByIdHandler,deleteNoteByIdHandler};
