import React from 'react';
import Layout from "../components/layout";
import Link from "next/link";

const Menu = () => {
    const meta = {
        title: "Меню кулинарии \"Мамина кухня\"\n",
        description: "Наш ассортимент и цены",
        img: "/public/layout-img.jpg"
    }
    const info = [
        {title:"Сегодня в нашей кулинарии", src:'/menu1.jpg'},
        {title:"Блюда под заказ", src:'/menu2.jpg'},
        {title:"Фуршет", src:'/menu3.jpg'}
    ]
    return (
        <Layout title={meta.title} description={meta.description} img={meta.img}>
            <section className='gal cols'>
                {
                    info.map((item, index)=>
                            <Link href="/" key={index}>
                                <a className='gal-link'>
                                    <div className='gal-wrap' >
                                        <div>
                                            {item.title}
                                        </div>
                                        <div className='gal-img'>
                                            <div className="gal-img-wrap">
                                                <img src={item.src} alt={`img${index}`}/>
                                            </div>
                                         </div>
                                    </div>
                                </a>
                            </Link>


                    )
                }
            </section>
        </Layout>
    );
};

export default Menu;