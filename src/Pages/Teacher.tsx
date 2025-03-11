import Navbar from "../Component/Navbar";
import Style from "../Style/teacher.module.css";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
import DeleteModal from "../Component/Deletemodal";
const Teacher = () => {
  const [teachertabel, settable] = useState<any>();
  const [loading,setLoading] = useState(true);
  const [formData, setFormData] = useState({
    teacherName: "",
    subject: "",
    email: "",
    contact: "",
    salary: "",
    address: "",
    password: "",
    file: null,
  });

  function writeUserData(formData: any) {
    const db = getDatabase(app);
    const formid = push(ref(db, `teacher_info`)).key;
    set(ref(db, `teacher_info/${formid}`), formData);
  }

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      !formData.teacherName ||
      !formData.email ||
      !formData.contact ||
      !formData.salary ||
      !formData.address ||
      !formData.password ||
      !formData.file
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    writeUserData(formData);
    setFormData({
      teacherName: "",
      subject: "",
      email: "",
      contact: "",
      salary: "",
      address: "",
      password: "",
      file: null,
    });
  };

  useEffect(() => {
    const db = getDatabase(app);
    const teacherref = ref(db, `teacher_info`);
    onValue(teacherref, (res) => {
      const data = res.val();
      const teacherlist = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
        settable(teacherlist)
        setLoading(false)
        console.log(teacherlist)
    });
   
  
}, []);

  return (
    <>
      <Navbar />
      <div className={Style.pageWrapper}>
        <div className={Style.container}>
          <h1 className={Style.heading}>Add Teacher</h1>
          <form onSubmit={handleSubmit}>
            <label>Teacher Name</label>
            <input
              type="text"
              value={formData.teacherName}
              name="teacherName"
              placeholder="Enter Teacher Name"
              onChange={handleChange}
              className={Style.input}
              required
            />

            <label>Subject Specialist (Optional)</label>
            <input
              type="text"
              value={formData.subject}
              name="subject"
              placeholder="Enter Subject"
              onChange={handleChange}
              className={Style.input}
            />

            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className={Style.input}
              required
            />

            <div className={Style.flexRow}>
              <div>
                <label>Contact #</label>
                <input
                  type="text"
                  value={formData.contact}
                  name="contact"
                  placeholder="Contact #"
                  onChange={handleChange}
                  className={Style.input}
                  required
                />
              </div>

              <div>
                <label>Salary</label>
                <input
                  type="text"
                  value={formData.salary}
                  name="salary"
                  placeholder="Enter Salary"
                  onChange={handleChange}
                  className={Style.input}
                  required
                />
              </div>
            </div>

            <label>Address</label>
            <input
              type="text"
              value={formData.address}
              name="address"
              placeholder="Teacher Address"
              onChange={handleChange}
              className={Style.input}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className={Style.input}
              required
            />

            <label>Picture</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className={Style.fileInput}
              required
            />

            <button type="submit" className={Style.button}>
              Add Teacher
            </button>
          </form>
        </div>

        <div className={Style.table_container}>
  <table className={Style.basic_table}>
    <thead>
      <tr>
        <th>Teacher Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {loading ? <tr>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>
            Loading...
          </td>
        </tr> :teachertabel && teachertabel.map((val: any, index: any) => (
        <tr key={index}>
          <td>{val.teacherName}</td>
          <td>{val.email}</td>
          <td>{val.contact}</td>
          <td>
          <DeleteModal Deleteid={val.id} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </>
  );
};

export default Teacher;
