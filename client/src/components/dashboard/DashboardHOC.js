import React, { useState, useEffect, } from 'react';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';
import { Layout, message } from 'antd';
import { UserContext } from '../../context/userState/userContext';
import CustomFooter from './Footer';
import {UserReset} from '../../redux/userState/userAction'
import {useDispatch, useSelector} from'react-redux'

function DashboardHOC(Component, index) {
  return function DashboardCustomHoc(props) {
    const [collapsed, setCollapsed] = useState(true);
    const handleSetCollapsed = () => {
      setCollapsed(!collapsed);
    };
    const userstate = useSelector(state => state.user)
    const {
      error,
      errResponse,
      message: userMessage,
    } = userstate;
    const loggedInUser =localStorage.getItem('user')?localStorage.getItem('user'):""
    console.log(loggedInUser)
    const dispatch = useDispatch()
    useEffect(() => {
      if (error) {
        message.error(errResponse);
        dispatch(UserReset());
      }
    }, [error]);

    useEffect(() => {
      if (userMessage) {
        message.success(userMessage);
        dispatch(UserReset());
      }
    }, [userMessage]);
    const { history } = props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          index={index}
          collapsed={collapsed}
          loggedInUserId={loggedInUser}
        />
        <Layout className="site-layout">
          <PageHeader
            history={props.history}
            collapsed={collapsed}
            toggle={handleSetCollapsed}
          />
          <div className="container">
            <Component {...props} />
          </div>
          <CustomFooter />
        </Layout>
      </Layout>
    );
  };
}

export default DashboardHOC;
