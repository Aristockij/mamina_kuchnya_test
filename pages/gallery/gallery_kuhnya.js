import React from 'react';
import Layout from "../../components/layout";
import GalleryScrollContent from "../../components/elements/GalleryScrollContent";
import IconArrow from "../../components/icons/IconArrow";
import {observer} from "mobx-react";
import {useMobxStores} from "../../store/store";
import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import GalleryScrollContentMobile from "../../components/elements/GalleryScrollContentMobile";
gsap.registerPlugin(ScrollTrigger);

const Gallery_kuhnya = () => {
    const meta = {
        title: "Галерея кулинарии \"Мамина кухня\"",
        description: "Фотографии наших лучших блюд и процесса приготовления",
        img: "/public/layout-img.jpg"
    }
    const {nextStore} = useMobxStores();

    return (
        <>
            {
                !nextStore.mobileView &&
                <div className='container'>
                    <Link href="/gallery/gallery_zal/">
                        <a className='btn gallery-btn'>
                            торговый зал
                            <IconArrow/>
                        </a>
                    </Link>
                </div>
            }
            <Layout title={meta.title} description={meta.description} img={meta.img}>
                <div className="mobwrap">
                    {
                        nextStore.mobileView ?
                            <GalleryScrollContentMobile/>
                            : <GalleryScrollContent/>
                    }
                    {
                        nextStore.mobileView &&
                        <div className='container'>
                            <Link href="/gallery/gallery_zal/">
                                <a className='btn gallery-btn'>
                                    торговый зал
                                    <IconArrow/>
                                </a>
                            </Link>
                        </div>
                    }
                </div>
            </Layout>
        </>

    );
};

export default observer(Gallery_kuhnya);