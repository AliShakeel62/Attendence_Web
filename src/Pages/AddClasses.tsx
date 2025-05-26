import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import "../App.css";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
import Model from "../Component/Modal";
import DeleteModal from "../Component/Deletemodal";

export default function AddClasses() {
  const [datatable, setDatatable] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    className: "Class 1", // Default value
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

  const val = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addOrUpdateClass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop form reload
    setIsSubmitting(true);
    const db = getDatabase(app);
    const classKey = push(ref(db, "class_detail")).key;
    set(ref(db, `class_detail/${classKey}`), formData)
      .then(() => console.log("Class added successfully"))
      .catch((error) => console.error("Error adding class:", error));

    setFormData({
      className: "Class 1",
      classTeacher: "",
      studentLimit: "",
    });
    setIsSubmitting(false);
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

            <form onSubmit={addOrUpdateClass}>
              <label htmlFor="className">Class Name</label>
              <select
                name="className"
                value={formData.className}
                onChange={val}
                className="inp"
                required
              >
                <option value="Class I">Class I</option>
                <option value="Class II">Class II</option>
                <option value="Class III">Class III</option>
                <option value="Class IV">Class IV</option>
                <option value="Class V">Class V</option>
                <option value="Class VI">Class VI</option>
                <option value="Class VII">Class VII</option>
                <option value="Class VIII">Class VIII</option>
                <option value="Class IX">Class IX</option>
                <option value="Class X">Class X</option>
              </select>
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
                required
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
                required
              />
              <br />

              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
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
                        <DeleteModal Deleteid={item.id} subject={""} Selectedclass={""} />
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
 