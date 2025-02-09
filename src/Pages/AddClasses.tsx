import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import "../App.css";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  update,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import Model from "../Component/Modal";
import { useSelector } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyDXYgQqqyshW-JAjcr-3AeaaZyJxLotxJ4",
  authDomain: "attendence-project-8822e.firebaseapp.com",
  databaseURL: "https://attendence-project-8822e-default-rtdb.firebaseio.com",
  projectId: "attendence-project-8822e",
  storageBucket: "attendence-project-8822e.firebasestorage.app",
  messagingSenderId: "606213843903",
  appId: "1:606213843903:web:d37075966acfd147288f0a",
  measurementId: "G-6W1C2GWWJ9",
};
const app = initializeApp(firebaseConfig);

export default function AddClasses() {
  const [datatable, setDatatable] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [SelectedID, setSelectedID] = useState(null);

  // Redux state
  const Selector = useSelector((state: any) => state.modal);

  // Form state
  const [formData, setFormData] = useState({
    className: "",
    classTeacher: "",
    studentLimit: "",
  });

  // Update formData when Redux state changes
  useEffect(() => {
    setFormData({
      className: Selector.Class || "",
      classTeacher: Selector.Teacher || "",
      studentLimit: Selector.limit || "",
    });
  }, [Selector]);

  // Handle input changes
  const val = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle class ID selection
  const handelID = (item: any) => {
    setSelectedID(item.id);
  };

  // Add or update class
  const addOrUpdateClass = () => {
    setIsSubmitting(true);
    const db = getDatabase(app);

    if (SelectedID) {
      // Update existing class
      update(ref(db, `class_detail/${SelectedID}`), formData)
        .then(() => console.log("Class updated successfully"))
        .catch((error) => console.error("Error updating class:", error));
    } else {
      // Add new class
      const classKey = push(ref(db, "class_detail")).key;
      set(ref(db, `class_detail/${classKey}`), formData)
        .then(() => console.log("Class added successfully"))
        .catch((error) => console.error("Error adding class:", error));
    }

    // Reset form and state
    setFormData({
      className: "",
      classTeacher: "",
      studentLimit: "",
    });
    setSelectedID(null);
    setIsSubmitting(false);
  };

  // Fetch data from Firebase
  useEffect(() => {
    const db = getDatabase(app);
    const classRef = ref(db, "class_detail");
    setLoading(true);
    onValue(classRef, (res) => {
      const data = res.val();
      const classList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setDatatable(classList);
      setLoading(false);
    });
  }, [Selector]);

  return (
    <>
      <Navbar />
      <main
        style={{
          width: "100vw",
          height: "90vh",
          backgroundColor: "whitesmoke",
        }}
      >
        <div className="con">
          <div className="inpdiv">
            <p className="add">Add or Update Classes</p>
            <label htmlFor="className">Class Name</label>
            <input
              type="text"
              onChange={val}
              value={formData.className} // Bind to formData
              id="className"
              name="className"
              placeholder="Enter Class Name"
              className="inp"
            />
            <br />
            <label htmlFor="classTeacher">Class Teacher</label>
            <input
              type="text"
              onChange={val}
              value={formData.classTeacher} // Bind to formData
              id="classTeacher"
              name="classTeacher"
              placeholder="Enter Class Teacher"
              className="inp"
            />
            <br />
            <label htmlFor="studentLimit">Student Limit</label>
            <input
              type="text"
              onChange={val}
              value={formData.studentLimit} // Bind to formData
              id="studentLimit"
              name="studentLimit"
              placeholder="Enter Student Limit"
              className="inp"
            />
            <br />
            <button
              onClick={addOrUpdateClass}
              className="btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div className="table-container">
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <table className="basic-table overflow-auto">
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Class Teacher</th>
                    <th>Student Limit</th>
                    <th>Edit</th>
                    <th>id</th>
                  </tr>
                </thead>
                <tbody>
                  {datatable.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.className}</td>
                      <td>{item.classTeacher}</td>
                      <td>{item.studentLimit}</td>
                      <td>
                        <Model onupdate={addOrUpdateClass} onedit={() => handelID(item)} />
                      </td>
                      <td>{item.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}