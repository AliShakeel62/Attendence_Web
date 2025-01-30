import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Model: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className='btn' onClick={showModal}>
        Edit
      </button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='d-flex flex-column '>
        <input type="text" placeholder='Update ClassName' className='inp m-1' />
       <input type="text" placeholder='Update TeacherName' className='inp m-1' />
       <input type="text" placeholder='Update Student Limit' className='inp m-1'  />
        </div>

      </Modal>
    </>
  );
};

export default Model;