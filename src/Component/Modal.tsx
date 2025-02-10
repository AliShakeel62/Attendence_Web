import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { incrementByAmount } from "../Config/Redux/Modal/ModalSlice";
import { RootState } from "@reduxjs/toolkit/query";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  update,
} from "firebase/database";
import app from "../Firebase/FirebaseConfig";
const Model = ({
 
  onedit,
}: {
  
  onedit: string | number;
}) => {
  const [Class, setClass] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [limit, setlimit] = useState("");
  const dispatch = useDispatch();
  const [SelectedID, setSelectedID] = useState<any>();
  const [formData, setFormData] = useState({
    className: "",
    classTeacher: "",
    studentLimit: "",
  });

  const Edit = (SelectedID: any) => {
    const db = getDatabase(app);
    update(ref(db, `class_detail/${SelectedID}`), formData)
      .then(() => console.log("Class updated successfully"))
      .catch((error) => console.error("Error updating class:", error));
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClass(e.target.value);
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacher(e.target.value);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlimit(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setSelectedID(onedit);
  };

  const handleOk = () => {
    dispatch(incrementByAmount({ Class, Teacher, limit }));
   
    setIsModalOpen(false);
    Edit(SelectedID);
    
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Selector = useSelector((state: any ) => state.modal);
    useEffect(()=>{
      console.log(Selector)
      console.log(onedit)
      setFormData({
          className: Class,
          classTeacher: Teacher,
          studentLimit: limit,
      })
      
    },[Class,Teacher,limit])

  return (
    <>
      <button className="btn" onClick={showModal}>
        Edit
      </button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            backgroundColor: "whitesmoke",
            color: "black",
            border: "1px solid",
            borderColor: "whitesmoke",
          },
        }} // Custom color
      >
        <div className="d-flex flex-column ">
          <input
            onChange={handleClassChange}
            type="text"
            placeholder="Update ClassName"
            className="inp m-1"
          />
          <input
            onChange={handleTeacherChange}
            type="text"
            placeholder="Update TeacherName"
            className="inp m-1"
          />
          <input
            onChange={handleLimitChange}
            type="text"
            placeholder="Update Student Limit"
            className="inp m-1"
          />
        </div>
      </Modal>
    </>
  );
};

export default Model;
