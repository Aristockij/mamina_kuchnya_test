import React, {useState, useEffect} from "react";

const useMousePosition = () => {
    const [position, setPosition] = useState({
        clientX: 0,
        clientY: 0,
    });

    const updatePosition = e => {
        const { clientX, clientY } = e;

        setPosition({
            clientX,
            clientY,
        });
    };

    useEffect(() => {
        document.body.addEventListener("mousemove", updatePosition, false);
        document.body.addEventListener("mouseenter", updatePosition, false);

        return () => {
            document.body.removeEventListener("mousemove", updatePosition);
            document.body.removeEventListener("mouseenter", updatePosition);
        };
    }, []);

    return position;
}

export default useMousePosition;