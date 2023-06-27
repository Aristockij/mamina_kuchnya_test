import React, {useEffect} from 'react';

const Canvas = () => {
    useEffect(()=>{
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        // ctx.fillStyle = "green";
        ctx.fillRect(0, 0, 300, 100);

    }, [])
    return (
        <canvas className={'canvas'} id={'canvas'}/>
    );
};

export default Canvas;