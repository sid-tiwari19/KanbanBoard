import React, { useState, useContext, useEffect } from "react";
import Settings from "@mui/icons-material/SettingsInputComponentSharp";
import DropDown from "@mui/icons-material/ArrowDropDownSharp";
import KobanContext from "../context/KobanContext";

const Modal = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Dropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useContext(KobanContext);
  const { order, group, setOrder, setGroup } = context;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (event) => {
    const selectedGroup = event.target.value;
    setGroup(selectedGroup);
    localStorage.setItem("savedGroup", selectedGroup);
  };
  const handleOptionChange2 = (event) => {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    localStorage.setItem("savedOrder", selectedOrder);
  };

  useEffect(() => {
    const savedGroup = localStorage.getItem("savedGroup");
    const savedOrder = localStorage.getItem("savedOrder");

    if (savedGroup) {
      setGroup(savedGroup);
    }

    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, [setGroup, setOrder]);

  return (
    <div>
      <button className="d-btn" onClick={openModal}>
        <Settings sx={{ fontSize: "20px", margin: "5px" }} />
        <span className="drop-btn">Display</span>
        <DropDown
          className="drop-ico"
          sx={{ fontSize: "20px", margin: "5px" }}
        />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="drop-box">
          <p className="drop-para">Grouping</p>
          <select
            id="dropdown"
            value={group}
            onChange={handleOptionChange}
            className="drop-select"
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="drop-box">
          <p className="drop-para">Ordering</p>
          <select
            id="dropdown"
            value={order}
            onChange={handleOptionChange2}
            className="drop-select"
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default Dropdown;
