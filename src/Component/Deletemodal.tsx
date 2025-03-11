import React, { useEffect, useState } from "react";
import { Button, Modal, Space } from "antd";
import { remove, ref, getDatabase } from "firebase/database";
import app from "../Firebase/FirebaseConfig";
const DeleteModal = ({Deleteid}:{Deleteid: any}) => {
  const DeleteClasses = (id: number) => {
    const db = getDatabase(app);
    remove(ref(db, `class_detail/${id}`))
      .then(() => console.log("Class deleted successfully"))
      .catch((error) => console.error("Error deleting class:", error));
  };
  const DeleteTeacher = (id: number) => {
    const db = getDatabase(app);
    remove(ref(db, `teacher_info/${id}`))
      .then(() => console.log("Class deleted successfully"))
      .catch((error) => console.error("Error deleting class:", error));
  };
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    DeleteClasses(Deleteid);
    setOpen(false);
    DeleteTeacher(Deleteid)
  };

  const handleCancel = () => {
    setOpen(false);
  };
useEffect(()=>{
  console.log(Deleteid)
},[])
  return (
    <>
      <Button type="primary" danger onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Modal
        title="Confirm Deletion"
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleOk}>
            Delete
          </Button>,
        ]}
      >
        <p>Do you really want to delete this class?</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
