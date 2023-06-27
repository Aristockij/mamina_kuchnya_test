import React from 'react';
import Head from "next/head";
import { useRouter } from 'next/router'
import {domain} from "../../config/config";

const HeadMeta = (props) => {

    const router = useRouter();
    const url = router.pathname;
    const fullUrl = domain+router.pathname;

    return (
        <Head>

            <title>{props.title}</title>
            <meta name="description" content={props.description} />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta name="application-name" content="Мамина кухня" />
            <meta name="theme-color" content="#000000" />
            <meta name="google" content="nositelinkssearchbox" />
            <meta name="google" content="notranslate" />

            <meta name="author" content="https://diagram.team" />

            <meta name="subject" content={props.description} />
            <meta name="rating" content="General" />
            <meta name="referrer" content="no-referrer" />
            <meta name="format-detection" content="phone=no" />

            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title} />
            <meta property="og:image" content={props.img} />
            <meta property="og:image:alt" content={props.description} />
            <meta property="og:description" content={props.description} />
            <meta property="og:site_name" content="Мамина кухня" />
            <meta property="og:locale" content="en_EN" />
            <meta property="article:author" content="Мамина кухня" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@Мамина кухня"/>
            <meta name="twitter:creator" content="@Мамина кухня"/>
            <meta name="twitter:url" content={fullUrl}/>
            <meta name="twitter:title" content={props.title}/>.
            <meta name="twitter:description" content={props.description}/>.
            <meta name="twitter:image" content={props.img}/>.
            <meta name="twitter:image:alt" content={props.description}/>

            <meta name="pinterest" content="nopin" description="Not copy" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>

        </Head>
    )

}

export default HeadMeta;