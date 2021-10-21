import React, {  useState, useEffect } from 'react';

import DashboardHOC from '../DashboardHOC';
import { Typography, Popconfirm, Button } from 'antd';
import SingleUserStyled from './SingleUserStyled';
import { UserContext } from '../../../context/userState/userContext';
import PasswordForm from '../password/PasswordForm';
import UserForm from '../form/UserForm';
import CustomLoader from '../../common/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import {   fetchSingleUser,
  editUserAction,
  deleteUserAction,
  changeUserPasswordAction} from '../../../redux/userState/userAction'
function SingleUser(props) {

  const userstate = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [passwordFormVisibility, setpasswordFormVisibility] = useState(false);

  const { error, loading, user } =userstate;

  // const [initialValues, setinitialValues] = useState(null);
  const handlePasswordChange = (data) => {
    dispatch(changeUserPasswordAction(data));
    setpasswordFormVisibility(false);
  };

  const changePasswordModal = () => {
    setpasswordFormVisibility(!passwordFormVisibility);
  };
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [ id]);

  const onFinish = (values) => {
    values._id = user._id;
    dispatch(editUserAction(values));
  };

  const onConfirmDelete = () => {
    dispatch(deleteUserAction(id));
    props.history.push('/dashboard/users');
  };

  return (
    <SingleUserStyled>
      {user ? (
        <>
          <Typography>Edit {user.name}'s Profile</Typography>
          {user.role !== 'admin' ? (
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={onConfirmDelete}
              // onCancel={cancel}
              okText="Delete"
              cancelText="Cancel"
            >
              <Button className="float-right" danger>
                Delete {user.name}
              </Button>
            </Popconfirm>
          ) : null}

          <UserForm
            user={user}
            onFinish={onFinish}
            changePasswordModal={changePasswordModal}
            loading={loading}
          />
        </>
      ) : (
        <CustomLoader
          text={'Chill out, I am trying to get some data for you'}
        />
      )}
      <PasswordForm
        visible={passwordFormVisibility}
        onCreate={handlePasswordChange}
        loading={loading}
        onCancel={() => {
          setpasswordFormVisibility(false);
        }}
        id={id}
      />
    </SingleUserStyled>
  );
}

export default DashboardHOC(SingleUser);
