import { PageHeader, Button } from 'antd';
import React, { useState } from 'react';
import { Input } from 'antd';
import Link from 'next/link';
import OtpInput from 'react-otp-input';
const Register = () => {
    const [otp, setOtp] = useState('');
    const handleChange = (otp) => setOtp(otp);
    // const handelUserNameSubmit = () => {
    //     localStorage.setItem('username', userName);
    // };
    return (
        <div className="register-wrap">
            <div className="register-wrap__container">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title="Kích hoạt tài khoản"
                    footer="Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản"
                />
                <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    separator={<span>-</span>}
                    className="otpItem"
                    inputStyle={{ width: '40px', height: '40px', backgroundColor: '#fff', fontSize: '20px' }}
                    shouldAutoFocus
                    hasErrored
                    isInputNum
                />
                <p style={{ fontSize: '13px' }}>Gửi lại mã</p>
                {otp.length < 6 ? (
                    <Button type="primary" className="button" disabled>
                        Tiep tuc
                    </Button>
                ) : (
                    <Button type="primary" className="button">
                        <Link href="/register/email">Tiếp tục</Link>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Register;
