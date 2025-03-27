import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import "../App.css";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
import DeleteModal from "../Component/Deletemodal";
import Style from "../Style/addstudent.module.css";

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
    attendence: "",
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

  const addOrUpdateStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission
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
      attendence: "",
      picture: "",
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <main className={Style.main}>
        <div className={Style.con}>
          <form className={Style.inpdiv} onSubmit={addOrUpdateStudent}>
            <p className={Style.add}>Add or Update Student</p>

            <div className={Style.inlineInputs}>
              <div>
                <label className={Style.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={Style.inps}
                  required
                />
              </div>
              <div>
                <label className={Style.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={Style.inps}
                  required
                />
              </div>
            </div>

            <div>
              <label className={Style.label}>Father Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father Name"
                className={Style.inp}
                required
              />
            </div>

            <div>
              <label className={Style.label}>Father Contact</label>
              <input
                type="text"
                name="fatherContact"
                value={formData.fatherContact}
                onChange={handleChange}
                placeholder="Father Contact"
                className={Style.inp}
                required
              />
            </div>

            <div className={Style.inlineInputs}>
              <div>
                <label className={Style.label}>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Student ID"
                  className={Style.inps}
                  required
                />
              </div>
              <div>
                <label className={Style.label}>Class</label>
                <select
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={(e) =>
                    setFormData({ ...formData, studentClass: e.target.value })
                  }
                  className={Style.selectinp}
                  required
                >
                  <option value="">Select Class</option>
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
              </div>
            </div>

            <div>
              <label className={Style.label}>Address</label>
              <input
                type="text"
                name="attendence"
                value={formData.attendence}
                onChange={handleChange}
                placeholder="Address"
                className={Style.inp}
                required
              />
            </div>

            <div>
              <label className={Style.label}>Picture</label>
              <input
                type="file"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                className={Style.inp}
                required
              />
            </div>

            <button type="submit" className={Style.btn} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          <div className={Style.tableContainer}>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <table className={Style.basicTable}>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Father Name</th>
                    <th>Student ID</th>
                    <th>Address</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {datatable.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{item.firstName}</td>
                      <td>{item.fatherName}</td>
                      <td>{item.studentId}</td>
                      <td>{item.attendence}</td>
                      <td>
                        <DeleteModal Deleteid={item.id} />
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
