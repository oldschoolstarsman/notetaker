import axios from "axios";

const BACKEND_URL =
  "https://mynotesrn-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeNote(noteData) {
  const response = await axios.post(BACKEND_URL + "/notes.json", noteData);
  const id = response.data.name;
  return id;
}

export function updateNote(noteData) {
  console.log("here", noteData);
  const { note, title, isFavorite } = noteData;
  return axios.put(BACKEND_URL + `/notes/${noteData.id}.json`, {
    note,
    title,
    isFavorite,
  });
}

export async function getNotes() {
  const res = await axios.get(BACKEND_URL + "notes.json");
  const notes = [];

  for (const key in res.data) {
    const obj = {
      id: key,
      note: res.data[key].note,
      title: res.data[key].title,
    };
    notes.push(obj);
  }
  return notes;
}

export function deleteNote(id) {
  return axios.delete(BACKEND_URL + `/notes/${id}.json`);
}
