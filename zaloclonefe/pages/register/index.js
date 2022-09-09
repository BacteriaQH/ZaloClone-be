import { PageHeader, Button } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';
import Link from 'next/link';
const Register = () => {
    const [userName, setUerName] = useState('');
    const handedUserName = (e) => {
        setUerName(e.target.value);
    };
    const handelUserNameSubmit = ()=>{
         localStorage.setItem("username", userName);
    }
    return (
        <div className="register-wrap">
            <div className="register-wrap__container">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Tạo tài khoản"
                    footer="Sử dụng tên thật giúp bạn bè dễ nhận ra bạn hơn"
                />
                <Input placeholder="Tên đầy đủ" value={userName} onChange={handedUserName} />
                {userName === '' ? (
                    <Button type="primary" className="button" disabled>
                        Tiep tuc
                    </Button>
                ) : (
                    <Button type="primary" className="button" onClick={handelUserNameSubmit}>
                        <Link href="/register/email">Tiếp tục</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Register;
