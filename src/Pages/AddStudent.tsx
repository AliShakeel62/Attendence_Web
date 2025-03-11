import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import "../App.css";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
import DeleteModal from "../Component/Deletemodal";

export default function AddStudent() {
  const [datatable, setDatatable] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    fatherContact: "",
    studentId: "",
    studentClass: "",
    address: "",
    picture: "",
  });

  useEffect(() => {
    const db = getDatabase(app);
    const studentRef = ref(db, "student_detail");
    setLoading(true);
    onValue(studentRef, (res) => {
      const data = res.val();
      const studentList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setDatatable(studentList);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addOrUpdateStudent = () => {
    setIsSubmitting(true);
    const db = getDatabase(app);
    const studentKey = push(ref(db, "student_detail")).key;
    set(ref(db, `student_detail/${studentKey}`), formData)
      .then(() => console.log("Student added successfully"))
      .catch((error) => console.error("Error adding student:", error));
    
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      fatherContact: "",
      studentId: "",
      studentClass: "",
      address: "",
      picture: "",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <main style={{ width: "100vw", height: "90vh", backgroundColor: "whitesmoke" }}>
        <div className="con">
          <div className="inpdiv">
            <p className="add">Add or Update Student</p>
            <div className="inline-inputs">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="inp" />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="inp" />
            </div>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father Name" className="inp" />
            <input type="text" name="fatherContact" value={formData.fatherContact} onChange={handleChange} placeholder="Father Contact" className="inp" />
            <div className="inline-inputs">
              <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" className="inp" />
              <input type="text" name="studentClass" value={formData.studentClass} onChange={handleChange} placeholder="Class" className="inp" />
            </div>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="inp" />
            <input type="text" name="picture" value={formData.picture} onChange={handleChange} placeholder="Picture URL" className="inp" />
            <button onClick={addOrUpdateStudent} className="btn" disabled={isSubmitting}>
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Father Name</th>
                    <th>Father Contact</th>
                    <th>Student ID</th>
                    <th>Class</th>
                    <th>Address</th>
                    <th>Picture</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {datatable.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.fatherName}</td>
                      <td>{item.fatherContact}</td>
                      <td>{item.studentId}</td>
                      <td>{item.studentClass}</td>
                      <td>{item.address}</td>
                      <td><img src={item.picture} alt="Student" width="50" /></td>
                      <td><DeleteModal Deleteid={item.id} /></td>
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
