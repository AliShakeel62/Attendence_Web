import Navbar from "../Component/Navbar";
import Style from "../Style/Attendence.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import { getDatabase, ref, get, set } from "firebase/database";
import '../../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";

export default function Attendence() {
  const [showClass, setShowClass] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [filteredData, setFilteredData] = useState<any[]>([]);

  const fetchAttendanceData = async (selectedClass: string) => {
    try {
      const db = getDatabase();
      const snapshot = await get(ref(db, `student_detail/${selectedClass}`));

      if (snapshot.exists()) {
        const data = snapshot.val();
        const allData = Object.entries(data).map(([id, value]: any) => ({
          id,
          ...value,
        }));
        setFilteredData(allData);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // ✅ Attendance Saving Function
  const markAttendance = async (studentId: string, status: "present" | "absent") => {
    if (!selectedClass || !selectedDate) {
      alert("Please select class and date first.");
      return;
    }

    try {
      const db = getDatabase();
      const attendanceRef = ref(db, `attendance/${selectedClass}/${selectedDate}/${studentId}`);
      await set(attendanceRef, status);
      console.log(`Marked ${status} for ${studentId}`);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };
console.log(filteredData)
  return (
    <>
      <Navbar />
      <main className={Style.main}>
        <h1>Student Attendance</h1>

        <div className={Style.inpdiv}>
          <div style={{ position: "relative" }}>
            <label>Select Class</label>
            <input
              type="text"
              value={selectedClass}
              className={Style.inp}
              onClick={() => setShowClass(!showClass)}
              readOnly
            />
            {showClass && (
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
                  "Class I", "Class II", "Class III", "Class IV",
                  "Class V", "Class VI", "Class VII", "Class VIII",
                  "Class IX", "Class X"
                ].map(cls => (
                  <div
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setShowClass(false);
                    }}
                    className={Style.inpdivs}
                  >
                    {cls}
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
            onClick={() => fetchAttendanceData(selectedClass)}
            disabled={!selectedClass}
          >
            Take Attendance
          </button>
        </div>

<div className="container mt-5">
  <div className="row g-4">
    {filteredData.map((student, index) => (
      <div key={index} className="col-6 col-md-3 d-flex justify-content-center">
        <div className="card p-3 text-center" style={{ width: "100%", maxWidth: "200px" }}>
          {student.picture ? (
            <img
              src={student.picture}
              alt="profile"
              className="rounded-circle mx-auto"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          ) : (
            <i className="bi bi-person-circle text-primary" style={{ fontSize: "60px" }}></i>
          )}
          <p className="fw-bold mt-2">{student.firstName}</p>
          <div className="d-flex justify-content-between mt-2">
            <button
              className="btn btn-outline-dark btn-sm w-100 me-1"
              onClick={() => markAttendance(student.studentId, "present")}
            >
              Present
            </button>
            <button
              className="btn btn-outline-danger btn-sm w-100 ms-1"
              onClick={() => markAttendance(student.studentId, "absent")}
            >
              Absent
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      </main>
    </>
  );
}
