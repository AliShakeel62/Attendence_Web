import Navbar from "../Component/Navbar";
import Style from "../Style/Attendence.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import { getDatabase, ref, get, set } from "firebase/database";
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import ColumnGroup from "antd/es/table/ColumnGroup";

export default function TeacherAttendance() {
  const [showDepartment, setShowDepartment] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [filteredData, setFilteredData] = useState<any[]>([]);

  const fetchTeacherData = async () => {
  try {
    const db = getDatabase();
    const snapshot = await get(ref(db, `teacher_info/${selectedDepartment.toLocaleLowerCase()}/`));

    if (snapshot.exists()) {
      const data = snapshot.val();
      const allTeachers = Object.entries(data).map(([key, value]: any) => ({
        id: key,
        ...value.data, // ✅ extract `data` field
      }));
      setFilteredData(allTeachers);
    } else {
      setFilteredData([]);
    }
  } catch (error) {
    console.error("Error fetching teacher data:", error);
  }
};


  const markAttendance = async (teacherId: string, status: "present" | "absent") => {
    if (!selectedDepartment || !selectedDate) {
      alert("Please select department and date first.");
      return;
    }

    try {
      const db = getDatabase();
      const attendanceRef = ref(db, `teacher_attendance/${selectedDepartment}/${selectedDate}/${teacherId}`);
      await set(attendanceRef, status);
      console.log(`Marked ${status} for ${teacherId}`);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };
console.log(selectedDepartment)
  return (
    <>
      <Navbar />
      <main className={Style.main}>
        <h1>Teacher Attendance</h1>

        <div className={Style.inpdiv}>
          <div style={{ position: "relative" }}>
            <label>Select Department</label>
            <input
              type="text"
              value={selectedDepartment}
              className={Style.inp}
              onClick={() => setShowDepartment(!showDepartment)}
              readOnly
            />
            {showDepartment && (
              <div
                style={{
                  border: "1px solid black",
                  position: "absolute",
                  background: "white",
                  width: "100%",
                  zIndex: 1000,
                }}
              >
                {[
                  "Science", "Math", "Computer", "English", "Urdu", "Admin"
                ].map(dep => (
                  <div
                    key={dep}
                    onClick={() => {
                      setSelectedDepartment(dep);
                      setShowDepartment(false);
                    }}
                    className={Style.inpdivs}
                  >
                    {dep}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <label>Attendance Date</label>
            <input
              type="date"
              value={selectedDate}
              className={Style.inp}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </div>

          <button
            className={Style.btn}
            onClick={() => fetchTeacherData()}
            disabled={!selectedDepartment}
          >
            Take Attendance
          </button>
        </div>

        <div className="container text-center position-relative">
          <div className="row mt-5">
            <div className="row d-flex justify-content-evenly">
              {filteredData.map((teacher, index) => (
                <div key={index} className={`${Style.cards} col-5 col-md-5 col-lg-2`}>
                  {teacher.file ? (
                    <img
                      src={teacher.file}
                      alt="profile"
                      style={{ width: "90px", height: "70px", borderRadius: "60%" }}
                    />
                  ) : (
                    <i className="bi bi-person-circle text-primary" style={{ fontSize: "50px" }}></i>
                  )}
                  <p className="fs-3 pt-3">{teacher.teacherName}</p>
                  <div className={Style.btn_div}>
                    <button
                      className={Style.btn_p}
                      onClick={() => markAttendance(teacher.teacherId, "present")}
                    >
                      Present
                    </button>
                    <button
                      className={Style.btn_danger}
                      onClick={() => markAttendance(teacher.teacherId, "absent")}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
