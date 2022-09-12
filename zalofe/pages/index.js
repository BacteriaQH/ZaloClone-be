import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button } from 'antd';

import Link from 'next/link';
export default function Home() {
    return (
        <div className={styles.container}>
                <Link href='/login'><Button type="primary" className={styles.button}>Đăng nhập</Button></Link>
            <Link href='/register'><Button type="dashed" className={styles.button}>Đăng ký</Button></Link>
        </div>
    );
}
