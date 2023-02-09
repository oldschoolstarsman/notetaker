import axios from "axios";

const BACKEND_URL =
  "https://mynotesrn-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeNote(noteData) {
  const response = await axios.post(BACKEND_URL + "/notes.json", noteData);
  return response.data.name;
}

export async function updateNote(noteData) {
  const { note, title, isFavorite } = noteData;
  const response = await axios.put(BACKEND_URL + `/notes/${noteData.id}.json`, {
    note,
    title,
    isFavorite,
  });
  console.log(noteData);
  console.log(response.data);
  return {
    id: noteData.id,
    ...response.data,
  };
}

export async function getNotes() {
  const res = await axios.get(BACKEND_URL + "notes.json");
  const notes = [];

  for (const key in res.data) {
    const obj = {
      id: key,
      note: res.data[key].note,
      title: res.data[key].title,
      isFavorite: res.data[key].isFavorite,
    };
    notes.push(obj);
  }
  return notes;
}

export async function deleteNote(id) {
  await axios.delete(BACKEND_URL + `/notes/${id}.json`);
  return id;
}
