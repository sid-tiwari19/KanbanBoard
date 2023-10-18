import React, { useState, useEffect, useContext } from "react";
import KobanContext from "../context/KobanContext";
import { Status } from "./Status";
import { Priority } from "./Priority";
import { User } from "./User";
import Done from "@mui/icons-material/CheckCircle";
import Warning from "@mui/icons-material/Warning";
import Progress from "@mui/icons-material/HistoryToggleOff";
import Todo from "@mui/icons-material/Event";
import Cancelled from "@mui/icons-material/Cancel";
import Low from "@mui/icons-material/SignalCellularAlt1Bar";
import Medium from "@mui/icons-material/SignalCellularAlt2Bar";
import High from "@mui/icons-material/SignalCellularAlt";
import Urgent from "@mui/icons-material/PriorityHigh";
import Nop from "@mui/icons-material/Pending";

export const Bucket = ({ tickets, users }) => {
  const context = useContext(KobanContext);
  const { group } = context;

  const statIcons = {
    Backlog: (
      <Warning
        className="ico"
        sx={{ color: "red", fontSize: "20px", margin: "2px" }}
      />
    ),
    Todo: (
      <Todo
        className="ico"
        sx={{ color: "blue", fontSize: "20px", margin: "2px" }}
      />
    ),
    "In progress": (
      <Progress
        className="ico"
        sx={{ color: "orange", fontSize: "20px", margin: "2px" }}
      />
    ),
    Completed: (
      <Done
        className="ico"
        color="success"
        sx={{ fontSize: "20px", margin: "2px" }}
      />
    ),
    Cancelled: (
      <Cancelled
        className="ico"
        sx={{ color: "grey", fontSize: "20px", margin: "2px" }}
      />
    ),
  };
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Function to fetch and set the images
    const fetchImages = async () => {
      try {
        const imagePaths = await importAll(
          require.context("../img", false, /\.(png|jpe?g|svg)$/)
        );
        setImages(imagePaths);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    fetchImages();
  }, []);

  const importAll = (context) => context.keys().map(context);

  const userIcons = users.reduce((icons, user, index) => {
    icons[user.id] = images[index];
    return icons;
  }, {});

  const priorityIcons = {
    0: (
      <Nop
        className="ico"
        sx={{ color: "grey", fontSize: "20px", margin: "2px" }}
      />
    ),
    1: <Low className="ico" sx={{ fontSize: "20px", margin: "2px" }} />,
    2: <Medium className="ico" sx={{ fontSize: "20px", margin: "2px" }} />,
    3: <High className="ico" sx={{ fontSize: "20px", margin: "2px" }} />,
    4: (
      <Urgent
        className="ico"
        sx={{ color: "red", fontSize: "20px", margin: "2px" }}
      />
    ),
  };

  return (
    <div>
      {group === "status" && (
        <Status
          users={users}
          tickets={tickets}
          statIcons={statIcons}
          userIcons={userIcons}
          priorityIcons={priorityIcons}
        />
      )}
      {group === "priority" && (
        <Priority
          users={users}
          tickets={tickets}
          statIcons={statIcons}
          userIcons={userIcons}
          priorityIcons={priorityIcons}
        />
      )}
      {group === "user" && (
        <User
          users={users}
          tickets={tickets}
          userIcons={userIcons}
          priorityIcons={priorityIcons}
          statIcons={statIcons}
        />
      )}
    </div>
  );
};
