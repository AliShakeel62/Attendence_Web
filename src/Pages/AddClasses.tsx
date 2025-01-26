import React from "react";
import Navbar from "../Component/Navbar";
import "../App.css";
import { getDatabase, ref, set } from "firebase/database";

export default function AddClasses() {
  const [name, setName] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [limit, setLimit] = React.useState("");

  const val = (e:any) => {
    const { name, value } = e.target;
    if (name === "className") setName(value);
    if (name === "classTeacher") setTeacher(value);
    if (name === "studentLimit") setLimit(value);
  };

  const addClass = () => {
    const db = getDatabase();
    const classDetails = {
      className: name,
      classTeacher: teacher,
      studentLimit: limit,
    };
    set(ref(db, "class_detail/"), classDetails)
      .then(() => {
        console.log("Class added successfully:", classDetails);
      })
      .catch((error) => {
        console.error("Error adding class:", error);
      });
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          width: "100%",
          height: "90vh",
          backgroundColor: "whitesmoke",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="inpdiv">
            <p className="add">Add classes</p>

            <label htmlFor="className">Class Name</label>
            <input
              type="text"
              onChange={val}
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
              id="studentLimit"
              name="studentLimit"
              placeholder="Enter Student Limit"
              className="inp"
            />
            <br />
            <button onClick={addClass}>Submit</button>
          </div>
          <div className="table-container">
            <table className="basic-table">
              <thead>
                <tr>
                  <th>Class Name</th>
                  <th>Class Teacher</th>
                  <th>Student Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IX C</td>
                  <td>Miss Najma</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
