import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const StoreContext = React.createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  const fetchDiaryEntries = async (userUID) => {
    try {
      const diaryEntriesCollectionRef = collection(
        db,
        "users",
        userUID,
        "diaryEntries"
      );

      // Query the subcollection to get all entries for the authenticated user
      const q = query(diaryEntriesCollectionRef);

      const querySnapshot = await getDocs(q);

      const entries = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() });
      });
      setEntries(entries);
      return entries;
    } catch (error) {
      console.error("Error fetching diary entries:", error);
      throw error;
    }
  };

  const storeDiaryEntry = async (userUID, title, diaryEntry) => {
    try {
      // Create a reference to the "diaryEntries" subcollection under the user's document
      const diaryEntriesCollectionRef = collection(
        db,
        "users",
        userUID,
        "diaryEntries"
      );

      // Create an object that contains both the title and diaryEntry
      const entryData = {
        title: title,
        date: new Date().getTime(),
        diaryEntry: diaryEntry,
      };

      // Add the entryData object to the subcollection
      await addDoc(diaryEntriesCollectionRef, entryData);

      console.log("Diary entry stored successfully.");
    } catch (error) {
      console.error("Error storing diary entry:", error);
      throw error;
    }
  };

  async function updateDiaryEntry(userUID, entryId, updatedData) {
    try {
      // Create a reference to the specific document to update
      const entryRef = doc(db, "users", userUID, "diaryEntries", entryId);

      // Update the document with the new data
      await updateDoc(entryRef, updatedData).then(() =>
        fetchDiaryEntries(currentUser.uid)
      );

      console.log("Diary entry updated successfully.");
    } catch (error) {
      console.error("Error updating diary entry:", error);
      throw error;
    }
  }

  async function deleteDiaryEntry(userUID, entryId) {
    try {
      // Create a reference to the specific document to delete
      const entryRef = doc(db, "users", userUID, "diaryEntries", entryId);

      // Delete the document
      await deleteDoc(entryRef);

      console.log("Diary entry deleted successfully.");
    } catch (error) {
      console.error("Error deleting diary entry:", error);
      throw error;
    }
  }

  useEffect(() => {
    //returns function through which we can unsubscribe from onAuthStateChanged event
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    entries,
    fetchDiaryEntries,
    storeDiaryEntry,
    updateDiaryEntry,
    deleteDiaryEntry,
  };
  return (
    <StoreContext.Provider value={value}>
      {!loading && children}
    </StoreContext.Provider>
  );
};
