import React from 'react';
import Link from 'next/link';

const Page404 = () => {
    return (
        <>
            <div className='home-bg page404-bg'>
                <img src="/contact-bg.jpg" alt="bg"/>
                <div className='page404-blur'/>
            </div>
            <div className='page404-title'>
                Страница не найдена
            </div>
            <Link href="/">
                <a className='btn page404-btn'>
                    на главную
                </a>
            </Link>
        </>

    );
};

export default Page404;