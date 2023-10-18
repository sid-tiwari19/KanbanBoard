import React, { useContext, useEffect, useState } from "react";
import KobanContext from "../context/KobanContext";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Status = ({
  tickets,
  users,
  statIcons,
  userIcons,
  priorityIcons,
}) => {
  const context = useContext(KobanContext);
  const { order } = context;
  const [ans, setAns] = useState([]);

  const status = ["Backlog", "Todo", "In progress", "Completed", "Cancelled"];
  const arr = [];

  status.forEach((stat) => {
    arr.push(tickets.filter((ticket) => ticket.status === stat));
  });

  useEffect(() => {
    const newArr = arr.map((val) => {
      if (order === "priority") {
        return val.slice().sort((a, b) => b.priority - a.priority);
      } else {
        return val
          .slice()
          .sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
          );
      }
    });
    setAns(newArr);
  }, [order]);

  return (
    <div className="bucket">
      {ans.map((stat, index) => (
        <div statIcons={index} className="col">
          <div className="plus-ico">
            <div>
              {statIcons[status[index]]}
              <span>
                {status[index]}
                <span className="count">{stat.length}</span>
              </span>
            </div>
            <div>
              <AddIcon sx={{ fontSize: "20px" }} />
              <MoreHorizIcon sx={{ fontSize: "20px" }} />
            </div>
          </div>
          {stat.map((ticket) => (
            <div statIcons={ticket.id} className="card">
              <div className="stat-title">
                <div className="stat-top">
                  <p className="user-id">{ticket.id}</p>
                  <span>
                    <img
                      className="user-img"
                      src={userIcons[ticket.userId]}
                      alt=""
                    />
                    <div
                      className="avail"
                      style={{
                        backgroundColor: users.filter(
                          (val) => val.id === ticket.userId
                        )[0].available
                          ? "#91C250"
                          : "red",
                      }}
                    ></div>
                  </span>
                </div>
              </div>
              <div className="title-div">
                <span className="stat-title">
                  {ticket.title.length > 60
                    ? `${ticket.title.substring(0, 60)}...`
                    : ticket.title}
                </span>
              </div>
              <div style={{ display: "flex" }}>
                {priorityIcons[ticket.priority]}
                <span className="tag">
                  <div className="dot"></div>
                  {ticket.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
