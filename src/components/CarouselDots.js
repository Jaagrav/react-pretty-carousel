import React, {useEffect, useRef} from 'react';

import {presentIndex} from "./CarouselWrapper";

function CarouselDots({index, onClick, items, totalItems}) {
    const controlDot = useRef(), interval = useRef();
    
    useEffect(() => { 
        clearInterval(interval.current)
        const rpc_content_wrapper = controlDot.current.parentElement.parentElement.parentElement.children[0];
        const carouselItemWidth = Math.floor(rpc_content_wrapper.scrollWidth/totalItems);
        
        if(index === 0) controlDot.current.classList.add("active");

        if(carouselItemWidth * index >= rpc_content_wrapper.scrollWidth - (carouselItemWidth * (items - 1))) controlDot.current.classList.add("hide");
        else controlDot.current.classList.remove("hide");

        interval.current = setInterval(() => {
            if(presentIndex === index) {
                controlDot.current.classList.add("active");
            } else {
                if(!isNaN(presentIndex))
                    controlDot.current.classList.remove("active");
            }
        },100)
    }, [items])

    return (
        <div className="rpc-control-dot" onClick={onClick} ref={controlDot}></div>
    )
}

export { CarouselDots }; 
