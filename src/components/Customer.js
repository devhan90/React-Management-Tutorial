import React from 'react';

const Customer = (props) => {
  const { name, birthday, gender, job, id, image } = props;
  return (
    <div>
      <CustomerProfile
        id={id}
        image={image}
        name={name}
      />
      <CustomerInfo 
        birthday={birthday}
        gender={gender}
        job={job}
      />
    </div>
  );
};

const CustomerProfile = (props) => {
  const { id, name, image } = props;
  return (
    <div>
      <img src={image} alt="profile" />
      <h2>
        {name}
        ({id})
      </h2>
    </div>
  );
};

const CustomerInfo = (props) => {
  const { birthday, gender, job } = props;
  return (
    <div>
      <p>{birthday}</p>
      <p>{gender}</p>
      <p>{job}</p>
    </div>
  );
};

export default Customer;
