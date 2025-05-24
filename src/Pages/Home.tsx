import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Style from "../Style/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
import DataTable, { TableColumn } from "react-data-table-component";

interface AttendanceRow {
  className: string;
  totalStudents: number;
  presentToday: number;
}

interface Teacher {
  name: string;
  subject: string;
  photoURL: string;
}

const Home: React.FC = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [tableData, setTableData] = useState<AttendanceRow[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const db = getDatabase(app);

    // Get Students Count
    onValue(ref(db, "student_detail/"), (snapshot) => {
      const data = snapshot.val();
      let count = 0;
      if (data) {
        Object.values(data).forEach((group: any) => {
          Object.values(group).forEach(() => count++);
        });
      }
      setStudentCount(count);
    });

    // Get Class Count
    onValue(ref(db, "class_detail/"), (snapshot) => {
      const data = snapshot.val();
      if (data) setClassCount(Object.keys(data).length);
    });

    // Attendance Data
    const studentRef = ref(db, "student_detail/");
    const attendanceRef = ref(db, "attendance/");
    onValue(studentRef, (studentSnap) => {
      const studentData = studentSnap.val() || {};
      onValue(attendanceRef, (attSnap) => {
        const attData = attSnap.val() || {};
        let totalPresent = 0;
        const result: AttendanceRow[] = Object.entries(studentData).map(
          ([className, studentsObj]: [string, any]) => {
            const studentIds = Object.keys(studentsObj || {});
            const todayAttendance = attData[className]?.[today] || {};
            const presentCount = Object.values(todayAttendance).filter(
              (status) => status === "present"
            ).length;
            totalPresent += presentCount;
            return {
              className,
              totalStudents: studentIds.length,
              presentToday: presentCount,
            };
          }
        );
        setPresentToday(totalPresent);
        setTableData(result);
      });
    });

    // Get Teachers
    const teacherRef = ref(db, "teacher_info/");
    onValue(teacherRef, (snapshot) => {
      const data = snapshot.val();
      const allTeachers: Teacher[] = [];
      let count = 0;

      if (data) {
        Object.entries(data).forEach(([subject, subjectGroup]: [string, any]) => {
          for (const teacherNode of Object.values(subjectGroup) as any[]) {
            const teacher = teacherNode.data;
            if (teacher) {
              allTeachers.push({
                name: teacher.teacherName || "Unknown",
                subject: subject,
                photoURL: teacher.file || "https://via.placeholder.com/40", // yeh ab sirf fallback ke liye hai
              });
              count++;
            }
          }
        });
      }

      setTeacherCount(count);
      setTeachers(allTeachers);
    });

  }, []);

  const columns: TableColumn<AttendanceRow>[] = [
    { name: "Class", selector: (row) => row.className, sortable: true },
    { name: "Total Students", selector: (row) => row.totalStudents, sortable: true },
    { name: "Present Today", selector: (row) => row.presentToday, sortable: true },
  ];

  return (
    <>
      <Navbar />
      <div className={Style.main}>
        <div className="container py-5">
          {/* Top Cards */}
          <div className="row text-center g-4">
            {[
              { count: studentCount, label: "Students", icon: "bi-person" },
              { count: teacherCount, label: "Teachers", icon: "bi-person-badge" },
              { count: classCount, label: "Classes", icon: "bi-people" },
              { count: presentToday, label: "Present Today", icon: "bi-eye" },
            ].map((item, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="shadow-sm p-2 rounded bg-white d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="fw-bold">{item.count}</h4>
                    <p className="text-muted mb-0">{item.label}</p>
                  </div>
                  <i className={`bi ${item.icon} fs-2 text-dark`}></i>
                </div>
              </div>
            ))}
          </div>

          {/* Attendance Table & Teacher Section */}
          <div className="row mt-5">
            {/* Teachers */}
            <div className="col-12 col-lg-4 mb-4">
              <div className="shadow-sm p-3 bg-white rounded">
                <h5 className="fw-bold mb-3">Teachers</h5>
                {teachers.map((teacher, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <img
                      src={teacher.photoURL}
                      alt={teacher.name}
                      className="rounded-circle"
                      style={{ width: 40, height: 40, objectFit: "cover", marginRight: 12 }}
                    />
                    <div>
                      <div className="fw-semibold">{teacher.name}</div>
                      <small className="text-muted">{teacher.subject}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Table */}
            <div className="col-12 col-lg-8">
              <div className="shadow-sm bg-white p-3 rounded">
                <h5 className="fw-bold mb-3">Today's Attendance by Class</h5>
                <DataTable
                  columns={columns}
                  data={tableData}
                  pagination
                  responsive
                  highlightOnHover
                  striped
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
