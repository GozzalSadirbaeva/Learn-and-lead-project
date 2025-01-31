import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const GroupContext = createContext();

const GroupContextCom = ({ children }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://nt-shopping-list.onrender.com/api/groups",
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("AccesToken")}`,
            },
          }
        );
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    })();
  }, []);

  return (
    <GroupContext.Provider value={[groups, setGroups]}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextCom;
