import Navbar from "../Component/Navbar";
import Style from "../Style/Attendence.module.css";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import app from "../Firebase/FirebaseConfig"; // path depends on where your firebase.js is

import { useState } from "react";


export default function Attendence() {
  const [showClass, setShowClass] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showDate, setShowDate] = useState(false);
  

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  type StudentData = {
    id: string;
    name: string;
    class: string;
    rollNo: string;
  };

  const [resultData, setResultData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const fetchAttendanceData = async (
    selectedClass: string,
    selectedType: string
  ) => {
    try {
      console.log(
        "Selected Class:",
        selectedClass,
        "Selected Type:",
        selectedType
      );
      const q = query(
        collection(app , "student_detail"),
        where("studentClass", "==", selectedClass),
        where("attendanceType", "==", selectedType)
      );

      const querySnapshot = await getDocs(q);
      const dataArr: any[] = [];

      querySnapshot.forEach((doc) => {
        dataArr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(`Fetched Data:`, dataArr);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className={Style.main}>
        <h1>Attendencs</h1>

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
                }}
              >
                <div
                  onClick={() => {
                    setSelectedClass("Class I");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class I
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class II");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class II
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class III");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class III
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class IV");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class IV
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class V");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class V
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class VI");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class VI
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class VII");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class VII
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class VIII");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class VIII
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class IX");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class IX
                </div>
                <div
                  onClick={() => {
                    setSelectedClass("Class X");
                    setShowClass(false);
                  }}
                  className={Style.inpdivs}
                >
                  Class X
                </div>
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <label>Attendance type</label>
            <input
              type="text"
              value={selectedType}
              className={Style.inp}
              onClick={() => setShowType(!showType)}
              readOnly
            />
            {showType && (
              <div
                style={{
                  border: "1px solid black",
                  position: "absolute",
                  background: "white",
                  width: "100%",
                }}
              >
                <div
                  onClick={() => {
                    setSelectedType("student_detail");
                    setShowType(false);
                  }}
                  className={Style.inpdivs}
                >
                  Student
                </div>
                <div
                  onClick={() => {
                    setSelectedType("Teacher");
                    setShowType(false);
                  }}
                  className={Style.inpdivs}
                >
                  teacher
                </div>
                <div
                  onClick={() => {
                    setSelectedType("Staff");
                    setShowType(false);
                  }}
                  className={Style.inpdivs}
                >
                  Staff
                </div>
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <label>Attendance Date</label>
            <input type="date" value={selectedDate} className={Style.inp} />
          </div>
          <button
            className={Style.btn}
            onClick={() => fetchAttendanceData(selectedClass, selectedType)}
          >
            Take Attendance
          </button>
        </div>
      </main>
    </>
  );
}
