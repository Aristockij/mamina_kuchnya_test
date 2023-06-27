import React, {useEffect, useState} from 'react';
import Layout from "../components/layout";
import Flour from "../components/icons/Flour";
import {useMobxStores} from "../store/store";
import {observer} from "mobx-react";
import StockInfo from "../components/elements/StockInfo";
import {motion, AnimatePresence} from "framer-motion";

const Stock = () => {
    const meta = {
        title: "Акции кулинарии \"Мамина кухня\"",
        description: "Скидки, промокоды и сезонные предложения кулинарии",
        img: "/public/layout-img.jpg"
    }
    const {nextStore} = useMobxStores();

    useEffect(()=>{
        if(nextStore.load && nextStore.scrollIsLoaded) {
            setTimeout(()=>{
                setStartAnimation(true);
            }, 500)
        }
    },[ nextStore.load, nextStore.scrollIsLoaded ])


    const [darkBg, setDarkBg]=useState(false);
    const [startAnimation, setStartAnimation]=useState(false);
    const variants ={
        active: {
            transform: "translateY(0%)",
        },
        unactive: {
            transform: "translateY(100%)",
        },
    }

    const data = [
        {title: 'ХЛЕБНОЕ УТРО', text: 'Скидка на весь хлеб 20% с 08:00 до 09:00', img:'/fancy.jpg' },
        {title: 'истинная француженка', text: 'Всем любителям Франции на багеты и круассаны скидка 25% по кодовому слову “БОнЖУР ля багет”', img:'/fancy.jpg' },
        {title: 'Забота о близком ', text: 'при покупке от 2 шт любой выпечки скидка 10% после 18:00, самые лучшие и качественное сырье используется для выпечки, вы будете приятно удивлены вкусу и аромату блюда. Будем рады приобретению нашей продукции' },
        {title: 'Забота о близком ', text: 'при покупке от 2 шт любой выпечки скидка 10% после 18:00, самые лучшие и качественное сырье используется для выпечки, вы будете приятно удивлены вкусу и аромату блюда. Будем рады приобретению нашей продукции' },
        {title: 'Забота о близком ', text: 'при покупке от 2 шт любой выпечки скидка 10% после 18:00, самые лучшие и качественное сырье используется для выпечки, вы будете приятно удивлены вкусу и аромату блюда. Будем рады приобретению нашей продукции' },
    ]
    const dataBg = [
        {src:'/bg-stock.jpg', id:0},
        {src:'/bg-stock2.jpg', id:1},
        {src:'/bg-stock3.jpg', id:2},
        {src:'/bg-stock4.jpg', id:3},
        {src:'/bg-stock5.jpg', id:4},
    ]
    const [indexActive, setIndexActive]=useState(0);
    const changeBg = (index)=>{
        setIndexActive(index)
    }
    const changeBgLeave = ()=>{
        setIndexActive(0)
    }
    return (
        <>
            <div className="bg-fixed-wrap">
                {
                    dataBg.map((item, index)=>
                        <div    key={index}>
                            <AnimatePresence exitBeforeEnter >
                                {
                                    indexActive===item.id &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{opacity:0}}
                                        transition={{duration: 0.9 }}
                                        className={`${darkBg || startAnimation? "bg-fixed active":"bg-fixed"}`}>
                                        <img src={item.src} alt="bg-stock"/>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>

                    )
                }
            </div>
            <div className={`${startAnimation ? "stock-btn-wrap active " : "stock-btn-wrap" }`}>
                <div className="btn stock-btn ">
                    акции
                    {
                        startAnimation &&
                        <span>
                            <Flour/>
                        </span>
                    }
                </div>
            </div>
            <div className="container">
                <div className={`${startAnimation ? "stock-img-left active":"stock-img-left"}`}>
                    <img src='/menu3.jpg' alt='img-bg'/>
                </div>
                <div className={`${startAnimation ? "stock-img-right active":"stock-img-right"}`}>
                    <img src='/bg.jpg'alt='img-bg2'/>
                </div>
            </div>

            <Layout title={meta.title} description={meta.description} img={meta.img}>
                <section className='stock'>
                    <section className='container'>
                        <AnimatePresence exitBeforeEnter>
                            {
                                startAnimation &&
                                <motion.div
                                    variants={variants}
                                    initial='unactive'
                                    transition={{
                                        duration: .9,
                                    }}
                                    exit='unactive'
                                    animate={startAnimation ? "active" : 'unactive'}
                                    className='stock-content'>
                                    <div className="stock-mobile-title">
                                        акции
                                    </div>
                                    {
                                        data.map((item, index)=>
                                            <StockInfo changeBgLeave={changeBgLeave} changeBg={changeBg} key={index} title={item.title}  text={item.text} img={item.img} index={index}/>
                                        )
                                    }
                                </motion.div>
                            }
                        </AnimatePresence>
                    </section>

                </section>
            </Layout>
        </>

    );
};

export default observer(Stock);