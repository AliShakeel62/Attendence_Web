import React, { useState } from "react";
import { Button, Modal } from "antd";
import { remove, ref, getDatabase } from "firebase/database";
import app from "../Firebase/FirebaseConfig";

interface Props {
  Deleteid: string;
  Selectedclass: string;
}

const DeleteStudentModal: React.FC<Props> = ({ Deleteid, Selectedclass }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const db = getDatabase(app);
    remove(ref(db, `student_detail/${Selectedclass}/${Deleteid}`))
      .then(() => {
        console.log("Student deleted successfully");
        setOpen(false);
      })
      .catch((error) => console.error("Error deleting student:", error));
      console.log(Selectedclass,Deleteid)
  };

  return (
    <>
      <Button type="primary" danger onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Modal
        title="Confirm Deletion"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Do you really want to delete this student?</p>
      </Modal>
    </>
  );
};

export default DeleteStudentModal;
