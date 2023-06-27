import React from 'react';
import IconArrow from "../../components/icons/IconArrow";
import Layout from "../../components/layout";
import GalleryScrollContent from "../../components/elements/GalleryScrollContent";
import {useMobxStores} from "../../store/store";
import {observer} from "mobx-react";
import Link from 'next/link';
import GalleryScrollContentMobile from "../../components/elements/GalleryScrollContentMobile";

const GalleryZal = () => {
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
                    <Link  href="/gallery/gallery_kuhnya/">
                        <a className='btn gallery-btn'>
                            кухня
                            <IconArrow/>
                        </a>
                    </Link>
                </div>
            }

            <Layout title={meta.title} description={meta.description} img={meta.img}>
                <div className='mobwrap'>
                    {
                        nextStore.mobileView ?
                        <GalleryScrollContentMobile/>
                            : <GalleryScrollContent/>
                    }
                    {
                        nextStore.mobileView &&
                        <div className='container'>
                            <Link  href="/gallery/gallery_kuhnya/">
                                <a className='btn gallery-btn'>
                                    кухня
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

export default observer(GalleryZal);