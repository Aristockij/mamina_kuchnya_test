import React from 'react';
import {motion} from "framer-motion";
import Flour from "../icons/Flour";
import Logo from "../icons/Logo";
import Link from 'next/link';
import {useRouter} from "next/router";

const Menu = () => {
    const link = [
        {title:'меню', link:'/menu/'},
        {title:'галерея', link:'/gallery/gallery_kuhnya/'},
        {title:'акции', link:'/stock/'},
        {title:'контакты', link:'/contacts/'},
    ]
    const router = useRouter();

    return (
        <motion.div
            initial={{x:300,}}
            animate={{x:0 }}
            exit={{x:300}}
            transition={{
                duration: .3,
            }}
            className="menu">

                    <div className='home-logo home-logo-menu'>
                        <Link href="/">
                            <a>
                                <Logo/>
                            </a>
                        </Link>
                    </div>
                    <div className='menu-links'>
                        <ul>
                            <nav className='cols cols--end'>
                                {
                                    link.map((item,index)=>
                                        <li className={`header-link ${router.asPath.replace(/\b\/.+/gm, '')  === item.link.replace(/\b\/.+/gm, '') ? 'active':''}`} key={index}>
                                            <Link href={item.link}>
                                                <a>
                                                    {item.title}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                }
                                <li className="header-link ">
                                    <a rel="noreferrer" href='https://m-kyhnia.ru/' target={'_blank '}>
                                        сеть предприятий
                                    </a>
                                </li>

                            </nav>
                        </ul>
                    </div>
                    <div className='menu-footer'>
                        <div>
                            МЫ ОТКРЫТЫ С 8:00 ДО 20:00
                        </div>
                        <div>
                            ХЛЕБОЗАВОДCКОЙ ПРОЕЗД, 22
                        </div>
                        <div>
                            <a href="tel:8 (8332) 760-630">
                                8 (8332) 760-630
                            </a>
                        </div>
                    </div>

        </motion.div>
    )
}

export default Menu;