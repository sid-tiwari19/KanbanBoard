import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Dropdown from "./components/DropDown";
import KobanState from "./context/KobanState";
import { Bucket } from "./components/Bucket";

const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <KobanState>
        <div className="nav">
          <Dropdown />
        </div>
        <div className="display">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <Bucket tickets={tickets} users={users} />
            </div>
          )}
        </div>
      </KobanState>
    </div>
  );
};

export default App;
