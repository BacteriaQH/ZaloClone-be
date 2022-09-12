import { PageHeader, Button } from 'antd';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Link from 'next/link';
import axios from 'axios';
const Otp = () => {
    const [otp, setOtp] = useState();
    const handleOtp = (otp) => setOtp(otp);
    // const handelEmailSubmit = async () => {
    //    try{
    //         axios.post()
    //    }
    //    catch(e){
    //     console.log(err)
    //    }
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
                    onChange={handleOtp}
                    numInputs={6}
                    separator={<span>-</span>}
                    className="otpItem"
                />
                {otp ? (
                    <Button type="primary" className="buttonResgiter">
                        <Link href="/register/otp">Tiếp tục</Link>
                    </Button>
                ) : (
                    <Button type="primary" className="buttonResgiter" disabled>
                        Tiếp tục
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Otp;
