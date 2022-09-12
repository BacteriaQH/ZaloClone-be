import { Tabs } from 'antd';
import React from 'react';
import Login from '../../components/Login';

const App = () => (
    <div className="loginPage">
        <div className="loginPage__container">
            <div className="loginPage__container__header">
                <h1>Zalo</h1>
                <p>Đăng nhập tài khoản Zalo để kết nối với ứng dụng Zalo Web</p>
            </div>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Với mã QR" key="1">
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Với email" key="2">
                    <Login />
                </Tabs.TabPane>
            </Tabs>
        </div>
    </div>
);

export default App;
