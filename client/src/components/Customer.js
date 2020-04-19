import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

const Customer = (props) => {
  const { name, birthDay, gender, job, id, image } = props;
  return (
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell><img src={image} alt="profile" /></TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{birthDay}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={props.stateRefresh} id={props.id} /></TableCell>
      </TableRow>
  );
};


export default Customer;
