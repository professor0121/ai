import React,{useContext} from 'react';
import {UserContext} from '../context/user.context';

const home = () => {
    const {user}=useContext(UserContext);
  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default home