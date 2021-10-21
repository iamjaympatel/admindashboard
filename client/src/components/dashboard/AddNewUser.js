import React from 'react';
import UserForm from './form/UserForm';
import DashboardHOC from './DashboardHOC';
import { UserContext } from '../../context/userState/userContext';
import  {addUser} from'../../redux/userState/userAction'
import { useDispatch, useSelector } from 'react-redux';
function AddNewUser() {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    console.log(values);
    dispatch(addUser(values));
  };
  const user = useSelector(state => state.user)
  return (
    <>
      <UserForm user={user.me} onFinish={onFinish} />
    </>
  );
}

export default DashboardHOC(AddNewUser);
