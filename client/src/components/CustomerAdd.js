import React, { useState } from 'react';
import { post } from 'axios';

const CustomerAdd = (props) => {
  const [form, setForm] = useState({
    file: null,
    userName: '',
    birthDay: '',
    gender: '',
    job: '',
    fileName: '',
  }, []);
  const {file, userName, birthDay, gender, job, fileName} = form;

  const addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', userName);
    formData.append('birthDay', birthDay);
    formData.append('gender', gender);
    formData.append('job', job);
    const config = {
      header: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response.data);
      props.stateRefresh();
    });
    setForm({
      file: null,
      userName: '',
      birthDay: '',
      gender: '',
      job: '',
      fileName: '',
    });
  };

  const handleFileChange = (e) => {
    const nextForm = {
      ...form,
      file: e.target.files[0],
      fileName: e.target.value,
    };
    setForm(nextForm);
  };

  const handleValueChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(nextForm);
  };

  return (
<form onSubmit={handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지:{' '}
        <input
          type="file"
          name="file"
          file={file}
          value={fileName}
          onChange={handleFileChange}
        />
        <br />
        이름:{' '}
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleValueChange}
        />
        <br />
        생년월일:{' '}
        <input
          type="text"
          name="birthDay"
          value={birthDay}
          onChange={handleValueChange}
        />
        <br />
        성별:{' '}
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={handleValueChange}
        />
        <br />
        직업:{' '}
        <input
          type="text"
          name="job"
          value={job}
          onChange={handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
  )

};

export default CustomerAdd;
