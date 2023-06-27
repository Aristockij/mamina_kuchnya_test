import Layout from "../components/layout";
import IconArrow from "../components/icons/IconArrow";
import Logo from "../components/icons/Logo";
import Flour from "../components/icons/Flour";
import {useEffect, useState} from "react";
import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {useMobxStores} from "../store/store";
import {observer} from "mobx-react";
import {CursorContextProvider} from "../components/cursor/CursorContextProvider";
import Cursor from "../components/cursor/Cursor";

gsap.registerPlugin(ScrollTrigger);

const Home=()=>{

    const meta = {
        title: "Кулинария \"Мамина кухня\"",
        description: "Вкусная домашняя кухня, хлеб только что из духовки, праздничные десерты и свежесваренный кофе!",
        img: "/public/layout-img.jpg"
    }
    const {nextStore} = useMobxStores();

    const [play, setPlay]=useState(false)

    useEffect(()=>{
        if(nextStore.load && nextStore.scrollIsLoaded){
            setTimeout(()=>{
                setPlay(true);
                let title = gsap.utils.toArray('.home-title span');
                const positionScroll = () => {
                    nextStore.setActiveHome(true);
                    gsap.to(title, {opacity:1, translateY:0, duration:.3, stagger:.5})
                }
                setTimeout(()=>{
                    positionScroll();
                },500)
            },200)
        }
    },[ nextStore.load, nextStore.scrollIsLoaded ])

    const [touchDevice, setTouchDevice] = useState(false);
    const [delay, setDelay] = useState(false);
    const [logoshow, setLogoshow] = useState(false);
    const [width, setWidth] = useState(false);

    useEffect(()=>{

        const isTouchDevice =
            "ontouchstart" in window
            || navigator.MaxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;

        if (isTouchDevice)
            setTouchDevice(true);

        setTimeout(()=>  setDelay(true) , 2500);
        setTimeout(()=>  setLogoshow(true) , 1500);

    },[]);

    useEffect(()=>{
        if(window.innerWidth < 800){
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        setWidth(window.innerWidth)

    },[]);
    return (
        <>
            <div className='home-bg'>
                <img src="/bg.jpg" alt="bg"/>
            </div>
            <Layout title={meta.title} description={meta.description} img={meta.img}>
                <CursorContextProvider>
                    {!touchDevice && delay ? <Cursor/> : null}
                    <section className='wrap-container'>

                        <div className='home-wrapper container'>
                            <div className={`${nextStore.activeHome ? "home-wrap active" : "home-wrap"}`}>
                                <div className='home-logo'>
                                    <Flour time={800}/>
                                    <Logo/>
                                </div>
                                <a rel="noreferrer"  href='https://m-kyhnia.ru/' target={'_blank '} className='home-btn btn'>
                                    <IconArrow/>
                                    <span>
                                        сеть предприятий
                                    </span>
                                </a>
                            </div>
                            <div className='home-title'>
                                <span>свежий хлеб</span>
                                <br/><span>только что из</span>
                                <br/><span>духовки!</span>
                            </div>
                        </div>
                    </section>
                </CursorContextProvider>
            </Layout>
        </>
    )

}
export default observer(Home)