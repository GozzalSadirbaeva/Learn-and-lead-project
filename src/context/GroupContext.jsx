import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const GroupContext = createContext();

const GroupContextCom = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [me, setMe] = useState([]);

  useEffect(() => {
    (async function () {
      let resme = await axios.get(
        `https://nt-shopping-list.onrender.com/api/auth`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("AccesToken")}`,
          },
        }
      );
      setMe(resme.data);
      // console.log(resme.data);
    })();
  }, []);

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
    <GroupContext.Provider value={[groups, setGroups, me, setMe]}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContextCom;
