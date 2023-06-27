import React from 'react';
import {motion} from "framer-motion";

const Preloader = ()=>{
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{opacity:0}}
            transition={{
                duration: 0.4,
                type: "spring"
        }}
            className={'preloader'}>
            <div className={'preloader-wrapper'}>
                {/*<img src="/preloaderSvg.svg" alt="spiner"/>*/}
            </div>
        </motion.div>
    )
}

export default Preloader;