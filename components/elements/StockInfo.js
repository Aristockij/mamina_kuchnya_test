import React, {useState} from 'react';
import IconArr from "../icons/IconArr";
import Fancybox from "../fancybox/fancybox";

const StockInfo = ({img, title, text, index, changeBg, changeBgLeave}) => {
    const [vis, setVis]=useState(false);

    return (
        <div className={`${vis ? "stock-content-wrap active":"stock-content-wrap"}`} onMouseEnter={()=>changeBg(index)} onMouseLeave={()=>changeBgLeave()} >

            <div className='stock-content-title' onClick={()=> {
                if(img){
                    setVis(!vis)
                }
            }}>
                {title}
                {
                    img &&
                    <IconArr className='stock-content-arr'/>
                }
            </div>
            <div className='stock-content-text'>
                <p>
                    {text}
                </p>
            </div>
            {
                img &&
                <div className='stock-content-hid' >
                    <Fancybox>
                        <div className='stock-content-img' data-fancybox={`gallery${index}`} data-src={img}>
                            <img src={img} alt="img-hid"/>
                        </div>
                    </Fancybox>
                </div>
            }


        </div>
    );
};

export default StockInfo;