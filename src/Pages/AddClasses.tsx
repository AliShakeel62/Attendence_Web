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
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [limit, setLimit] = useState("");
  const [datatable, setDatatable] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const Selector = useSelector((state: any) => state.modal);

  const val = (e: any) => {
    const { name, value } = e.target;
    if (name === "className") setName(value);
    if (name === "classTeacher") setTeacher(value);
    if (name === "studentLimit") setLimit(value);
  };

  const addOrUpdateClass = () => {
    setIsSubmitting(true);
    const db = getDatabase(app);
    const classDetails = {
      className: name,
      classTeacher: teacher,
      studentLimit: limit,
    };

    // Find an existing class by matching class name
    const existingClass = datatable.find((cls: any) => cls.className === name);

    if (existingClass) {
      // Update existing class
      update(ref(db, `class_detail/${existingClass.id}`), classDetails)
        .then(() => console.log("Class updated successfully"))
        .catch((error) => console.error("Error updating class:", error));
    } else {
      // Add new class
      const classKey = push(ref(db, "class_detail")).key;
      set(ref(db, `class_detail/${classKey}`), classDetails)
        .then(() => console.log("Class added successfully"))
        .catch((error) => console.error("Error adding class:", error));
    }

    setName("");
    setTeacher("");
    setLimit("");
    setIsSubmitting(false);
  };

  useEffect(() => {
    console.log(Selector);
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
              value={name}
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
              value={teacher}
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
              value={limit}
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
                  </tr>
                </thead>
                <tbody>
                  {datatable.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.className}</td>
                      <td>{item.classTeacher}</td>
                      <td>{item.studentLimit}</td>
                      <td>
                        <Model />
                      </td>
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
