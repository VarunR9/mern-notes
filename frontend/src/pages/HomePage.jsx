import { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import RateLimitedUI from '../components/RatelimitUI';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
    
        const fetchedNotes = res.data.notes || []; 
        setNotes(fetchedNotes);
        
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
       
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {!loading && !isRateLimited && (
          notes.length === 0 ? (
            <NotesNotFound />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Homepage;