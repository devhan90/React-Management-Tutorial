import React, { useState } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  hidden: {
    display: 'none',
  },
});

const CustomerAdd = (props) => {
  const [form, setForm] = useState(
    {
      file: null,
      userName: '',
      birthDay: '',
      gender: '',
      job: '',
      fileName: '',
      open: false,
    },
    []
  );
  const { file, userName, birthDay, gender, job, fileName, open } = form;

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

  const handleClickOpen = () => {
    const nextForm = {
      ...form,
      open: true,
    };
    setForm(nextForm);
  };

  const handleClose = () => {
    const nextForm = {
      file: null,
      userName: '',
      birthDay: '',
      gender: '',
      job: '',
      fileName: '',
      open: false,
    };
    setForm(nextForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response.data);
      props.stateRefresh();
    });
    const nextForm = {
      file: null,
      userName: '',
      birthDay: '',
      gender: '',
      job: '',
      fileName: '',
      open: false,
    };
    setForm(nextForm);
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
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const { classes } = props;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <label>
            <input
              className={classes.hidden}
              accept="image/*"
              type="file"
              file={file}
              value={fileName}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === '' ? '프로필 이미지 선택' : fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthDay"
            value={birthDay}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={gender}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(CustomerAdd);
