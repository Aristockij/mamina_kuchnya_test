import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useMobxStores} from "../../store/store";
import {gsap} from "gsap";
import {useRouter} from "next/router";
import Logo from "../icons/Logo";


const Header = ({showMenu, show}) => {
    const {nextStore} = useMobxStores();
    const router = useRouter();
    const [mobileView, setMobileView]=useState(false)
    useEffect(()=>{
        setTimeout(()=>{
            let links = gsap.utils.toArray('.header-link');
            if(nextStore.activeHome && router.asPath === '/'){
                gsap.fromTo(links,{
                    opacity:0,
                    translateY:20,
                },{
                    opacity:1,
                    translateY:0,
                    stagger: .3,
                    // duration:3
                })
            }
        },200)
    }, [nextStore.activeHome]);
    const link = [
        {title:'меню', link:'/menu/'},
        {title:'галерея', link:'/gallery/gallery_kuhnya/'},
        {title:'акции', link:'/stock/'},
        {title:'контакты', link:'/contacts/'},
    ]
    const [windowWidth, setWindowWidth] = useState(5000);

    useEffect(()=>{
        setWindowWidth(window.innerWidth);

        const resize = new ResizeObserver(()=>{
            setWindowWidth(window.innerWidth);
        });
        resize.observe(document.querySelector("[data-scroll-container]"))
        let links = gsap.utils.toArray('.header-link');

        if( windowWidth<=1050){
            setMobileView(true)
        }else{
            setMobileView(false);
            gsap.fromTo(links,{
                opacity:0,
                translateY:20,
            },{
                opacity:1,
                translateY:0,
                stagger: .3,
            })
        }
        return ()=>{
            setWindowWidth(window.innerWidth);
            setMobileView(false);
        }
    },[windowWidth])

    return (
            <header className={`
                                ${router.asPath==='/' ? "header header-home" : "header"} 
                                ${(router.asPath!=='/' && router.asPath.indexOf('/gallery/')===-1) ? 'header-blur':''}
                                ${router.asPath.indexOf('/gallery/')!==-1 ? "header-black":''}
                                ${(router.asPath.indexOf('/gallery/')!==-1 && nextStore.mobileView)  ? "header-relative":''}
                              `}
            >
                {
                    !mobileView ?
                        <div className='header-container cols cols--acenter'>
                            {
                                router.asPath!=='/' &&
                                <Link href="/">
                                    <a className='header-logo'>
                                        <Logo/>
                                    </a>
                                </Link>
                            }
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
                                </nav>
                            </ul>
                        </div>
                        :
                        <>
                            {
                                router.asPath!=='/' &&
                                <Link href="/">
                                    <a className='header-logo'>
                                        <Logo/>
                                    </a>
                                </Link>
                            }
                            <button className={` ${showMenu ? "header-btn active" : "header-btn"} ${router.asPath.replace(/\b\/.+/gm, '') ==='/gallery' ? 'header-btn-black':''}`} onClick={show}>
                                <span/>
                                <span/>
                            </button>
                        </>

                }

            </header>
    )
}

export default Header;