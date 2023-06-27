import React from 'react';
import Fancybox from "../fancybox/fancybox";
import {useRouter} from "next/router";

const GalleryScrollContentMobile = () => {

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
            <div className="gallery-pin-mob">
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

export default GalleryScrollContentMobile;