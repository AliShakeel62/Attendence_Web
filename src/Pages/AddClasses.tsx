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
  remove,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import Model from "../Component/Modal";
import { useSelector } from "react-redux";
import app from "../Firebase/FirebaseConfig";

export default function AddClasses() {
  const [datatable, setDatatable] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [SelectedID, setSelectedID] = useState(null);
  const [Class, setclass] = useState("");
  const [Teacher, setteacher] = useState("");
  const [limit, setlimit] = useState("");

  const [formData, setFormData] = useState({
    className: "",
    classTeacher: "",
    studentLimit: "",
  });
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
  }, []);

  console.log(datatable);
  useEffect(() => {
    setFormData({
      className: Class,
      classTeacher: Teacher,
      studentLimit: limit,
    });
  }, [Class, Teacher, limit]);

  const val = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "className") setclass(value);
    if (name === "classTeacher") setteacher(value);
    if (name === "studentLimit") setlimit(value);
  };

  const addOrUpdateClass = () => {
    setIsSubmitting(true);
    const db = getDatabase(app);
    const classKey = push(ref(db, "class_detail")).key;
    set(ref(db, `class_detail/${classKey}`), formData)
      .then(() => console.log("Class added successfully"))
      .catch((error) => console.error("Error adding class:", error));

    setFormData({
      className: "",
      classTeacher: "",
      studentLimit: "",
    });
    setIsSubmitting(false);
  };

  const DeleteClasses = (id: any) => {
    const db = getDatabase(app);
    remove(ref(db, `class_detail/${id}`))
      .then(() => console.log("Class deleted successfully"))
      .catch((error) => console.error("Error deleting class:", error));
  };

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
              value={formData.className}
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
              value={formData.classTeacher}
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
              value={formData.studentLimit}
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
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {datatable.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.className}</td>
                      <td>{item.classTeacher}</td>
                      <td>{item.studentLimit}</td>
                      <td>
                        <Model onedit={item.id} />
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this class?"
                              )
                            ) {
                              DeleteClasses(item.id);
                            }
                          }}
                        >
                          Delete
                        </button>
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
