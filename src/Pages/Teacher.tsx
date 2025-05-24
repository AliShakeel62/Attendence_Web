import Navbar from "../Component/Navbar";
import Style from "../Style/teacher.module.css";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set, remove } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
import DeleteModal from "../Component/Deletemodal";

const Teacher = () => {
  const [teachertabel, settable] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    teacherId: "",
    teacherName: "",
    subject: "",
    email: "",
    contact: "",
    salary: "",
    address: "",
    password: "",
    file: null,
  });

  // Static subjects list
  const subjectList = [
    "Math",
    "Urdu",
    "Islamiat",
    "English",
    "Computer",
    "Sindhi",
    "Physics",
    "Chemistry",
    "Pak Study",
    "Biology",
    "Commerce",
  ];

  function writeUserData(formData: any) {
    const db = getDatabase(app);
    const subject = formData.subject?.toLowerCase() || "general";
    const newKey = push(ref(db)).key;

    const reader = new FileReader();
    reader.onload = () => {
      const pictureURL = reader.result;
      const dataToSave = {
        ...formData,
        file: pictureURL,
      };

      set(ref(db, `teacher_info/${subject}/${newKey}`), {
        data: dataToSave,
      });
    };
    if (formData.file) {
      reader.readAsDataURL(formData.file);
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    let newValue = type === "file" ? files[0] : value;

    if (name === "subject" && typeof newValue === "string") {
      newValue = newValue.toLowerCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      !formData.teacherId ||
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
      teacherId: "",
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
    const teacherRef = ref(db, `teacher_info/`);
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      const allTeachers: any[] = [];

      if (data) {
        Object.entries(data).forEach(([subject, teachers]: any) => {
          Object.entries(teachers).forEach(([id, value]: any) => {
            if (value?.data) {
              allTeachers.push({
                id,
                subject,
                ...value.data,
              });
            }
          });
        });
      }

      settable(allTeachers);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className={Style.pageWrapper}>
        <div className={Style.container}>
          <h1 className={Style.heading}>Add Teacher</h1>
          <form onSubmit={handleSubmit}>
            <label>Teacher ID</label>
            <input
              type="text"
              value={formData.teacherId}
              name="teacherId"
              placeholder="Enter Teacher ID"
              onChange={handleChange}
              className={Style.input}
              required
            />

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

            <label>Subject Specialist</label>
            <select
              value={formData.subject}
              name="subject"
              onChange={handleChange}
              className={Style.input}
              required
            >
              <option value="">Select Subject</option>
              {subjectList.map((subj) => (
                <option key={subj} value={subj.toLowerCase()}>
                  {subj}
                </option>
              ))}
            </select>

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
                <th>Teacher ID</th>
                <th>Teacher Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              ) : (
                teachertabel &&
                teachertabel.map((val: any, index: any) => (
                  <tr key={index}>
                    <td>{val.teacherId}</td>
                    <td>{val.teacherName}</td>
                    <td>{val.email}</td>
                    <td>{val.contact}</td>
                    <td>
                      <DeleteModal Deleteid={val.id} subject={val.subject} Selectedclass={undefined} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Teacher;
