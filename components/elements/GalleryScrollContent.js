import React, {useEffect, useState} from 'react';
import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin";
import {observer} from "mobx-react";
import {useMobxStores} from "../../store/store";
import Fancybox from "../fancybox/fancybox";
import {useRouter} from "next/router";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



const GalleryScrollContent = () => {
    const {nextStore} = useMobxStores();
    const [limit, setLimit]=useState({
        max:100,
        pullRatio:0,
    })

    const [scroll, setScroll] = useState(0);
    const [isScrolling, setIsScrolling]=useState(false);
    const [width, setWidth]=useState(null);

    // useEffect(()=>{
    //     const resize = new ResizeObserver(()=>{
    //         if(nextStore.locoScroll){
    //             setTimeout(()=>{
    //                 setWidth(window.innerWidth);
    //                 if(width < 1050){
    //                     gsap.killTweensOf(".gallery-pin");
    //                 }else{
    //                     ScrollTrigger.refresh();
    //                 }
    //             },10)
    //         }
    //     });
    //     resize.observe(document.querySelector("[data-scroll-container]"))
    //
    //     setWidth(window.innerWidth);
    //     if(width < 1050){
    //         nextStore.setIsDesctop(false)
    //     }else{
    //         nextStore.setIsDesctop(true)
    //     }
    //     return ()=>{
    //         setWidth(window.innerWidth);
    //     }
    // },[width])

    useEffect(()=>{
            setTimeout(()=>{
                let pinWrap = document.querySelector('.gallery-wrap');
                let pinWrapTitle =  document.querySelector('.gallery-wrap-title');
                let pinWrapWidth = pinWrap.scrollWidth;
                let horizontalScrollLenght =  pinWrapWidth - window.innerWidth;
                let widthTitle = pinWrapTitle.scrollWidth - window.innerWidth;



                let tl= gsap.timeline({
                    scrollTrigger: {
                        trigger: '.gallery-pin',
                        scrub: true,
                        pin: true,
                        start: `top top`,
                        end: `${pinWrapWidth}`,
                        scroller: "#smooth-scroll",
                        onUpdate: (self) => {
                            setScroll(self.progress * 5);
                        },
                    }
                })
                    .to('.gallery-wrap-title',{
                        x: -`${widthTitle}`,
                        ease: 'none',
                    }, )
                    .to('.gallery-wrap', {
                        x: -`${horizontalScrollLenght}`,
                        ease: 'none',
                    },'<')
            },200)
    },[])

    useEffect(()=>{
            const positionScroll = () => {
                setTimeout(()=>{
                    let className = document.querySelector('.has-scroll-init')
                    setIsScrolling(className.classList.contains('has-scroll-scrolling'))
                }, 300)
            }

            if(nextStore.load && nextStore.scrollIsLoaded){
                let scrolling = nextStore.locoScroll;
                scrolling.on("scroll",positionScroll);
            }
    },[scroll, isScrolling])

    useEffect(()=>{
        if (nextStore.load && nextStore.scrollIsLoaded && !nextStore.mobileView ){
            setTimeout(()=>{

                 let pinWrap = document.querySelector('.gallery-pin');
                 let pinWrapWidth = pinWrap.scrollWidth;
                 let horizontalScrollLength = pinWrapWidth - window.innerWidth;


                let getRandom = () => gsap.utils.random(-limit.max, limit.max);
                let round = value => Math.round(value * 10000) / 10000;
                let getModifier = home => value => {
                     value = parseFloat(value);
                     return round(value + (home - value) * limit.pullRatio) + "px";
                };

                if(!isScrolling){
                    gsap.utils.toArray(".gallery-wrap-img").forEach((element) => {
                        wander(element, gsap.getProperty(element, "x"), gsap.getProperty(element, "y"), gsap.getProperty(element, "z"))
                    });
                }else{
                    gsap.utils.toArray(".gallery-wrap-img").forEach((element) => {
                        gsap.to(element, {
                            x:0,
                            y:0,
                            z:0
                        })
                    });
                }
                function wander(element, homeX, homeY, homeZ) {
                        gsap.set(element, {
                            x: homeX + (gsap.getProperty(element, "x") - homeX) / (1 - limit.pullRatio),
                            y: homeY + (gsap.getProperty(element, "y") - homeY) / (1 - limit.pullRatio),
                            z: homeZ + (gsap.getProperty(element, "z") - homeZ) / (1 - limit.pullRatio),
                        })
                     let tl =   gsap.to(element, {
                            x: homeX + getRandom(),
                            y: homeY + getRandom(),
                            z: homeZ + getRandom(),
                            modifiers: {
                                x: getModifier(homeX),
                                y: getModifier(homeY),
                                z: getModifier(homeZ),
                            },
                            duration: gsap.utils.random(.5, 1),
                            ease: "none",
                        });
                        return ()=>gsap.kill(tl)
                }

            },200)
        }
    }, [nextStore.load, nextStore.scrollIsLoaded, isScrolling, nextStore.mobileView])

    const hallImg = [
        {src:'/hall/img1.jpg'},
        {src:'/hall/img2.jpg'},
        {src:'/hall/img3.jpg'},
        {src:'/hall/img4.jpg'},
        {src:'/hall/img5.jpg'},
        {src:'/hall/img6.jpg'},
        {src:'/hall/img7.jpg'},
        {src:'/hall/img8.jpg'},
        {src:'/hall/img9.jpg'},

    ]
    const kitchen = [
        {src:'/kitchen/img1.jpg'},
        {src:'/kitchen/img2.jpg'},
        {src:'/kitchen/img3.jpg'},
        {src:'/kitchen/img4.jpg'},
        {src:'/kitchen/img5.jpg'},
        {src:'/kitchen/img6.jpg'},
        {src:'/kitchen/img7.jpg'},
        {src:'/kitchen/img8.jpg'},
        {src:'/kitchen/img9.jpg'},
    ]
    const router=useRouter();

    return (
                <div className='gallery-pin-wrap'>

                    <div className="gallery-pin">
                        <div className='gallery-wrap-title'>
                            {router.asPath==='/gallery/gallery_kuhnya/' ?  "Кухня кулинарии" : "торговый зал"}
                        </div>
                        <div className='gallery-wrap'>
                            {
                                router.asPath!=='/gallery/gallery_kuhnya/' &&
                                hallImg.map((item, index)=>
                                    <div className='gallery-wrap-item'  key={index}>
                                        <Fancybox>
                                            <div  className="gallery-wrap-img" data-fancybox={`gallery`} data-src={item.src}>
                                                <img src={item.src} alt="item"/>
                                            </div>
                                        </Fancybox>
                                    </div>
                                )
                            }
                            {
                                router.asPath==='/gallery/gallery_kuhnya/'   &&
                                kitchen.map((item, index)=>
                                    <div className='gallery-wrap-item' key={index}>
                                        <Fancybox>
                                            <div className="gallery-wrap-img" data-fancybox={`gallery`} data-src={item.src}>
                                                <img src={item.src} alt="item"/>
                                            </div>
                                        </Fancybox>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
    );
};

export default  observer(GalleryScrollContent);