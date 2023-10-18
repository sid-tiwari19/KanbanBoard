import React, { useContext, useEffect, useState } from "react";
import kobanContext from "../context/KobanContext";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const User = ({
  tickets,
  users,
  userIcons,
  priorityIcons,
  statIcons,
}) => {
  const context = useContext(kobanContext);
  const { order } = context;
  const [ans, setAns] = useState([]);

  const mp = users.reduce((acc, val) => {
    acc[val.name] = val.id;
    return acc;
  }, {});

  const arr = [];

  users.forEach((stat) => {
    arr.push(tickets.filter((ticket) => ticket.userId === mp[stat.name]));
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
        <div key={index} className="col">
          <div className="plus-ico">
            <div>
              <img
                className="user-img"
                src={userIcons[users[index].id]}
                alt=""
              />
              <div
                className="avail"
                style={{
                  backgroundColor: users[index].available ? "#91C250" : "red",
                }}
              ></div>
              <span style={{ marginLeft: "20px", fontSize: "15px" }}>
                {users[index].name}
                <span className="count">{stat.length}</span>
              </span>
            </div>
            <div>
              <AddIcon sx={{ fontSize: "20px" }} />
              <MoreHorizIcon sx={{ fontSize: "20px" }} />
            </div>
          </div>
          {stat.map((ticket) => (
            <div key={ticket.id} className="card">
              <p className="user-id">{ticket.id}</p>

              <div className="title-div">
                {statIcons[ticket.status]}
                <span className="user-title">
                  {" "}
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
