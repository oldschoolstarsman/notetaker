import { useEffect, useState } from "react";
import { useAppDispatch } from "../store";
import { fetchNotes } from "../store/notes-thunks";

const useNotes = () => {
  const [results, setResults] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const notes = dispatch(fetchNotes);
    setResults(notes);
  }, []);

  return results;
};

export default useNotes;
