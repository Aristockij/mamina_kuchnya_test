import React, {useEffect, useState} from 'react';
import Layout from "../components/layout";
import Flour from "../components/icons/Flour";
import LogoTitle from "../components/icons/LogoTitle";
import Belash from "../components/icons/Belash";
import IconArrow from "../components/icons/IconArrow";
import {gsap} from "gsap/dist/gsap";
import {useMobxStores} from "../store/store";
import {observer} from "mobx-react";
import Cursor from "../components/cursor/Cursor";
import {CursorContextProvider} from "../components/cursor/CursorContextProvider";

const Contacts = () => {
    const meta = {
        title: "Контакты кулинарии \"Мамина кухня\"\n",
        description: "Наши адреса, телефоны и email для связи",
        img: "/public/layout-img.jpg"
    }

    const {nextStore} = useMobxStores();
    const [showAnim, setShowAnim]=useState(false);
    useEffect(()=>{
        let height = 331;
        if(window.innerWidth < 1150){
            height=245;
        }
        if(nextStore.load && nextStore.scrollIsLoaded){
            setTimeout(()=>{

                const positionScroll = () => {
                    nextStore.setActiveHome(true);
                    setShowAnim(true);
                    gsap.timeline({
                        ease: "none",
                    })
                        .to('.contact-info', {translateY:0, opacity:1, duration:.5})
                        .to('.contact-title', {translateY:0, opacity:1,delay:.2, duration:.5})
                        .to('.contact-info-svg',{opacity:1, duration:.5, delay:.3})
                }
                setTimeout(()=>{
                    positionScroll();
                },100)
            },200)
        }


    },[nextStore.load, nextStore.scrollIsLoaded])


    const [touchDevice, setTouchDevice] = useState(false);
    const [delay, setDelay] = useState(false);
    const [logoshow, setLogoshow] = useState(false);

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

    return (
        <>
            <div className="bg-fixed  bg-fixed-blur">
                <img src={'/contact-bg.jpg'} alt="bg-stock"/>
            </div>
            <Layout title={meta.title} description={meta.description} img={meta.img}>
                {!touchDevice && delay ? <Cursor/> : null}
                <CursorContextProvider>
                    <section className='contact container wrap-container'>
                        <div className='contact-title'>
                            Ждем за вкусной выпечкой и свежим хлебом
                            {
                                showAnim &&
                                <span className='contact-title-svg'>
                                     <Flour time={1000}/>
                                </span>
                            }
                        </div>
                        <div className='contact-info cols'>
                            <div className='contact-info-left'>
                                <div className='cols'> <span>Режим работы</span> <span> с 8:00 до 20:00</span></div>
                                <div className='cols'> <span>телефон</span> <span><a href="tel:8 (8332) 760-630">  8 (8332) 760-630</a></span></div>
                                <div className='cols'> <span>Адрес</span> <span>Хлебозаводской <br/>проезд, 22</span> </div>
                                <div className='cols'> <span>Управляющий</span> <span>Нелюбина Екатерина <br/> васильевна</span> </div>
                                <div className='cols cols--end'> <span><a href="tel: 8 (8332) 760-630"> 8 (8332) 760-630</a></span> </div>
                                <div className='cols'> <span>e-mail</span> <span><a href="mailto:mk-xz22@yandex.ru">mk-xz22@yandex.ru</a></span> </div>
                            </div>
                            <div className='contact-info-right'>
                            <span className='contact-info-svg'>
                                <Belash/>
                            </span>
                                <div >
                                    <LogoTitle/>
                                </div>
                                <div>
                                    <a href="">
                                        все предприятия сети  <IconArrow/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </CursorContextProvider>

            </Layout>
        </>

    );
};

export default  observer(Contacts);