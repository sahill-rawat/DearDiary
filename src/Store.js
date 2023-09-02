import React, { useContext, useState, useEffect } from "react";
import { collection, query, getDocs, where, addDoc } from 'firebase/firestore';
import { auth, db } from "./firebase";

const StoreContext = React.createContext();

export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);

    const getEntries = async (user) => {
        try {
          // Create a reference to the "diaryEntries" subcollection for the user
          const entriesCollectionRef = collection(db, 'users');
      
          // Create a query to get all entries in the subcollection
          const entriesQuery = query(entriesCollectionRef);
      
          // Execute the query and get the snapshot of entries
          const entriesSnapshot = await getDocs(entriesQuery);
      
          // Initialize an array to store the entries
          const entries = [];
      
          // Loop through the entries snapshot and extract the data
          entriesSnapshot.forEach((doc) => {
            const entryData = doc.data();
            entries.push(entryData);
          });
          setEntries(entries);
          return entries;
        } catch (error) {
          console.error('Error fetching diary entries:', error);
          throw error;
        }
      };

      const storeDiaryEntry = async (userUID, diaryEntry) => {
        try {
          // Create a reference to the "diaryEntries" subcollection under the user's document
          const diaryEntriesCollectionRef = collection(db, 'users', userUID, 'diaryEntries');
      
          // Add the diary entry to the subcollection
          await addDoc(diaryEntriesCollectionRef, diaryEntry);
      
          console.log('Diary entry stored successfully.');
        } catch (error) {
          console.error('Error storing diary entry:', error);
          throw error;
        }
      };

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
        getEntries
    };
    return (
        <StoreContext.Provider value={value}>
            {!loading && children}
        </StoreContext.Provider>
    );
};