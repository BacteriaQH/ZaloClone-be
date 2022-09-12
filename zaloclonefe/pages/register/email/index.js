import { PageHeader, Button, Form } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';
import Link from 'next/link';
import axios from 'axios';
const Register = () => {
    const [email, setEmail] = useState('');
    const handedEmail = (e) => {
        setEmail(e.target.value);
    };
    // const handelEmailSubmit = async () => {
    //    try{
    //         axios.post()
    //    }
    //    catch(e){
    //     console.log(err)
    //    }
    // };
    const rexEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    return (
        <div className="register-wrap">
            <div className="register-wrap__container">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Tạo tài khoản"
                    footer="Nhập email để tạo tài khoản mới"
                />

                <Input placeholder="Enter email" type="email" value={email} onChange={handedEmail} />
                { !rexEmail.test(email) ? (
                    <Button type="primary" className="buttonResgiter" disabled>
                        Tiếp tục
                    </Button>
                ) : (
                    <Button type="primary" className="buttonResgiter" >
                        <Link href="/register/otp">Tiếp tục</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Register;
