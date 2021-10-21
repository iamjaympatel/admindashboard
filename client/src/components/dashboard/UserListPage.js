import React, { useEffect } from 'react';
import DashboardHOC from './DashboardHOC';
import UserTable from './table/UserTable';
import { Link } from 'react-router-dom';
import CustomLoader from '../common/CustomLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/userState/userAction';

const index = '2';
function UserListPage() {
  const userstate = useSelector(state => state.user)
  const { users, loading } = userstate;
  const dispatch = useDispatch()
useEffect(() => {
  dispatch(fetchUsers())
  return () => {
  
  }
}, [])
  return (
    <div>
      <Link
        to="/dashboard/add-new-user"
        className="btn btn-primary float-right cursor-pointer mb-2 "
      >
        Add new user
      </Link>
      {!loading ? (
        <UserTable data={users} />
      ) : (
        <CustomLoader text={'Getting users from DB! Hold on gee...'} />
      )}
    </div>
  );
}

export default DashboardHOC(UserListPage, index);
