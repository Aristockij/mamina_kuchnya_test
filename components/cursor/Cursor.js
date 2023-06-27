import React, {useState, useEffect} from "react";
import useMousePosition from "./useMousePosition";
import {randomPics} from "../elements/RandomPics";

const Cursor = () => {

    const { clientX, clientY } = useMousePosition();
    const [isVisible, setIsVisible] = useState(false);
    const [arrImages, setArrImages] = useState([]);
    const [prevRandom, setPrevRandom] = useState(0);


    const addToArr = () => {
        let rand;
        for (let i=0; i<10; i++){
            rand = Math.floor(Math.random() * randomPics.length);
            if (rand !== prevRandom){
                setPrevRandom(rand);
                break;
            }
        }


        let animType = '';

        if (arrImages.length === 0){
            animType = 'pop1';
        }
        else{

            if ((clientX) < arrImages[arrImages.length - 1].x){
                animType = 'pop1';
            }
            else if ((clientX) > arrImages[arrImages.length - 1].x){
                animType = 'pop2';
            }
        }

        arrImages.push({img: randomPics[rand], x: clientX, y: clientY, del: false, anim: animType});
        setArrImages(arrImages);

    }

    useEffect(() => {
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);
        document.body.addEventListener("mouseenter", handleMouseEnter);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (clientX !== 0 && clientY !==0){
        if (arrImages.length === 0){
            addToArr();
        }
        else{

            if (arrImages[arrImages.length-1].x < (clientX - 300) || arrImages[arrImages.length-1].x > clientX + 300
                || arrImages[arrImages.length-1].y < (clientY - 300) || arrImages[arrImages.length-1].y > clientY + 300
            ){

                arrImages.forEach((el, index) => {
                    arrImages[index].del = true;
                });

                setArrImages(arrImages);

                addToArr();

                setTimeout(()=>{
                    arrImages[arrImages.length -1].del = true;
                    setArrImages(arrImages);
                }, 1000);

                if (arrImages.length > 100){
                    arrImages.splice(0, 50);
                    setArrImages(arrImages);
                }
            }
        }
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 4,
                pointerEvents: "none"
            }}
        >
            {arrImages.map( (el,i)=>
                    <div className={`pop-img ${el.del ? 'fade' : ''}`} key={i}
                        style={{
                            left: el.x,
                            top: el.y,
                            background: 'url('+el.img +') no-repeat 50% 50%',
                            //opacity: isVisible && clientX > 1 ? 1 : 0,
                            animation: `${el.anim} 1s`,
                            animationFillMode: 'forwards'
                    }}/>
                )}
        </div>
    );
};

export default Cursor;