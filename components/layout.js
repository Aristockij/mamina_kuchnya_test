import HeadMeta from "./layout/HeadMeta";
import React, {useEffect, useState} from "react";
import Header from "./layout/Header";
import {observer} from "mobx-react-lite";
import { useMobxStores } from '../store/store';
import {SmoothScrollProvider} from "./hooks/SmoothScrollProvider";
import Footer from "./layout/Footer";
import {useRouter} from "next/router";
import Preloader from "./layout/Preloader";
import {AnimatePresence} from "framer-motion";
import Menu from "./layout/Menu";
import {motion} from "framer-motion";
import {gsap} from "gsap/dist/gsap";

const Layout = observer(({ children, home, title, description, img })=>{

    const {nextStore} = useMobxStores();
    const [pageLoad, setPageLoad]=useState(false)
    const router = useRouter();

    const [windowWidth, setWindowWidth] = useState(5000);

    useEffect(()=>{
        setWindowWidth(window.innerWidth);
        const resize = new ResizeObserver(()=>{
            setWindowWidth(window.innerWidth);
        });
        resize.observe(document.querySelector("[data-scroll-container]"))

        if( windowWidth<=1050){
            nextStore.setMobileView(true)
        }else{
            nextStore.setMobileView(false);
        }
    },[windowWidth])

    useEffect ( ()  =>  {
        nextStore.setViewLoader(true);
        nextStore.setLoaded(false);

        window.addEventListener('load', () => {
            setPageLoad(true);
        });
        if(pageLoad){
            setTimeout(()=>{
                onLoad();
            },1000)
        }
        setTimeout(()=>{
            onLoad();
        },1000)
    },[]);

    const onLoad = () => {
        nextStore.setLoaded(true);
        nextStore.setViewLoader(false);
    }

    const [showMenu, setShowBtn]=useState(false)
    const show= ()=>{
        setShowBtn(!showMenu)
    }
    const variants ={
        active: {x:-300},
        unactive: {x:0},
    }
    return (
        <>
            {

                <AnimatePresence exitBeforeEnter>
                    {showMenu &&
                    <Menu/>}
                </AnimatePresence>
            }

            <motion.div
                variants={variants}
                initial='unactive'
                exit='unactive'
                transition={{
                    duration: .3,
                }}
                animate={showMenu ? "active" : 'unactive'}

                className={`${ showMenu ? 'wrap active':'wrap'}`}>
                <AnimatePresence exitBeforeEnter>
                    {nextStore.viewLoader && !nextStore.load &&
                        <Preloader/>
                    }
                </AnimatePresence>
                <HeadMeta title={title} description={description} img={img}/>
                {
                  (  router.asPath.indexOf('/gallery')===0 && nextStore.mobileView) || router.asPath !== '/'  &&
                    <Header show={show} showMenu={showMenu}/>
                }
                <div id='main-container' className={`wrap`} >
                    <SmoothScrollProvider>
                        {

                            <AnimatePresence exitBeforeEnter>
                                {showMenu &&
                                    <motion.div
                                        onClick={show}
                                        className={`${ showMenu ? 'close-menu active':'close-menu'}`}
                                    />
                                }
                            </AnimatePresence>
                        }
                        {
                            router.asPath === '/' &&
                            <Header show={show} showMenu={showMenu}/>
                        }
                        {
                            router.asPath.indexOf('/gallery')===0 && nextStore.mobileView &&
                            <Header show={show} showMenu={showMenu}/>
                        }
                        <main className={'main-content'}>{children}</main>
                        {
                            router.asPath === '/' &&
                            <Footer/>
                        }
                    </SmoothScrollProvider>
                </div>
            </motion.div>
        </>
    );
})
export default Layout;