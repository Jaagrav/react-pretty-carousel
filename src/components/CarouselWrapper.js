import React, {useEffect, useState, useRef} from "react";
import '../style/index.css';

import { CarouselItem } from "./CarouselItem";
import { CarouselDots } from "./CarouselDots";

let prev, next, moveTo, switchTo, presentIndex;

const CarouselWrapper = ({children, items, mode, showControls, loop}) => {
    if(!items) console.error("Items Prop is missing!!!");
    if(!mode) mode = "normal";
    if(showControls === null || showControls === undefined) showControls = true;
    loop = false;

    const [elements, setElements] = useState([...children]);
    const rpc_content = useRef(), rpc_content_wrapper = useRef(), rpc_content_wrapper_stage = useRef();
    let isDragging = false,
        rpc_content_wrapper_pos_x = 1, 
        drag_up_val = 0, 
        drag_down_val = 0, 
        carouselItemWidth = 0,
        contentClientWidth = 0;

    const creepToPosition = (mainFactor) => {
        rpc_content_wrapper_pos_x = mainFactor;
        drag_up_val = rpc_content_wrapper_pos_x;
        rpc_content_wrapper.current.style.transition = '.3s';
        rpc_content_wrapper.current.style.transform = `translateX(${rpc_content_wrapper_pos_x}px)`;
        setTimeout(() => {
            rpc_content_wrapper.current.style.transition = "0s";
        }, 300);
        presentIndex = Math.round(Math.abs(rpc_content_wrapper_pos_x)/carouselItemWidth);
    }

    const skipToPosition = (mainFactor) => {
        rpc_content_wrapper_pos_x = mainFactor;
        drag_up_val = rpc_content_wrapper_pos_x;
        rpc_content_wrapper.current.style.transition = '0s';
        rpc_content_wrapper.current.style.transform = `translateX(${rpc_content_wrapper_pos_x}px)`;
        presentIndex = Math.round(Math.abs(rpc_content_wrapper_pos_x)/carouselItemWidth);
    }

    const dragging = (e) => {
        contentClientWidth = -(rpc_content_wrapper.current.scrollWidth - rpc_content.current.clientWidth);
        
        if(e) {
            if(isDragging) {
                let clientX = ((e.touches) ? e.touches[0].clientX : e.clientX);
                rpc_content_wrapper_pos_x = (clientX - drag_down_val) + drag_up_val;
                if(rpc_content_wrapper_pos_x > 0) {
                    rpc_content_wrapper_pos_x /= (clientX/100);
                }
                else if(rpc_content_wrapper_pos_x < contentClientWidth) {
                    rpc_content_wrapper_pos_x = ((rpc_content_wrapper_pos_x+clientX)/20) + contentClientWidth;
                    if(rpc_content_wrapper_pos_x > contentClientWidth)
                        rpc_content_wrapper_pos_x -= Math.abs(rpc_content_wrapper_pos_x - contentClientWidth);
                }
                
                rpc_content_wrapper.current.style.transform = `translateX(${rpc_content_wrapper_pos_x}px)`;
                rpc_content.current.style.cursor = 'grabbing';
            }             
        }
        else {
            if(!isDragging) {
                rpc_content.current.style.cursor = 'grab';
                if(rpc_content_wrapper_pos_x >= 0)
                    creepToPosition(0);
                else if(rpc_content_wrapper_pos_x <= contentClientWidth)
                    creepToPosition(contentClientWidth);
                else if(Math.floor(rpc_content_wrapper_pos_x) % Math.floor(carouselItemWidth) !== 0) {
                    let mainFactor = 0;
                    let factor1 = Math.floor(rpc_content_wrapper_pos_x);
                    let factor2 = Math.floor(rpc_content_wrapper_pos_x);
                    
                    for(;--factor1 % Math.floor(carouselItemWidth) !== 0;) if(factor1 < contentClientWidth) break;
                    for(;++factor2 % Math.floor(carouselItemWidth) !== 0;) if(factor2 > 0) break;
                    
                    if(Math.abs(rpc_content_wrapper_pos_x - factor1) < Math.abs(rpc_content_wrapper_pos_x - factor2))
                        mainFactor = factor1;
                    else
                        mainFactor = factor2;
                    creepToPosition(mainFactor);     
                }
            }
        }
        presentIndex = Math.round(Math.abs(rpc_content_wrapper_pos_x)/carouselItemWidth);
    }

    const setDrag = (isDrag, e) => {
        isDragging = isDrag;
        if(isDrag) {
            drag_down_val = ((e.touches) ? e.touches[0].clientX : e.clientX);
        }
        else drag_up_val = rpc_content_wrapper_pos_x;
        dragging();
    }

    const resetCarouselItemWidth = () => {
        carouselItemWidth = rpc_content_wrapper.current.clientWidth / items;
    }

    next = () => {
        if(rpc_content_wrapper_pos_x > (contentClientWidth)) {
            rpc_content_wrapper_pos_x -= carouselItemWidth;
        }
        else {
            rpc_content_wrapper_pos_x = 0;
        }
        creepToPosition(rpc_content_wrapper_pos_x);
    }
    
    prev = () => {
        if(rpc_content_wrapper_pos_x - carouselItemWidth < -carouselItemWidth) {
            rpc_content_wrapper_pos_x += carouselItemWidth;
        }
        else {
            rpc_content_wrapper_pos_x = (contentClientWidth);
        }
        creepToPosition(rpc_content_wrapper_pos_x)
    }

    moveTo = (index) => {
        const posX = -(carouselItemWidth * (index - 1));
        
        if(posX > (-rpc_content_wrapper.current.scrollWidth+(carouselItemWidth * (items - 1))) && posX <= 0) creepToPosition(posX);
        else console.error("Invalid index Number, Make sure the index is greater than 0 and smaller than " + (elements.length - 1));
    }

    switchTo = (index) => {
        const posX = -(carouselItemWidth * (index - 1));
        
        if(posX > (-rpc_content_wrapper.current.scrollWidth+(carouselItemWidth * (items - 1))) && posX <= 0) skipToPosition(posX);
        else console.error("Invalid index Number, Make sure the index is greater than 0 and smaller than " + (elements.length - 1));
    }

    useEffect(() => { 
        creepToPosition(0); 
        if(loop) {
            setElements([...children, ...elements, ...children]);
        }// Loop feature is still under development...
    }, []);

    useEffect(() => {
        window.addEventListener("mouseup", (e) => setDrag(false,e));
        window.addEventListener("touchend", (e) => setDrag(false,e));
        window.addEventListener("mousemove", dragging);
        window.addEventListener("touchmove", dragging);
        window.addEventListener("keydown", (e) => {
            if(e.key === "ArrowLeft" || e.key === "ArrowUp")
                prev();
            else if(e.key === "ArrowRight" || e.key === "ArrowDown")
                next();
        })
        resetCarouselItemWidth();
        window.addEventListener("resize", () => {
            resetCarouselItemWidth();
            creepToPosition(0);
        });
        if(loop) {
            switchTo(children.length)
        }
    }, [items, mode, elements]);

    return (<div
        onMouseDown={(e) => setDrag(true,e)}
        onTouchStart={(e) => setDrag(true,e)}
        className="rpc-wrapper"
        ref={rpc_content} 
    >
        <div className="rpc-content-wrapper" ref={rpc_content_wrapper}>
            <div className="rpc-content-wrapper-stage" ref={rpc_content_wrapper_stage}>
                {elements.map((child, index) => (
                    <CarouselItem key={index} mode={mode} index={index} items={items}>{child}</CarouselItem>
                ))}
            </div>
        </div>
        { showControls ? (
            <div className="rpc-content-controls">
                <div className="rpc-content-control-dots">
                    {elements.map( (item, index) => (
                        <CarouselDots key={`dot-${index}`} onClick={()=>{moveTo(index + 1)}} index={index} items={items} totalItems={children.length} />
                        )
                    )}
                </div>
                <div className="rpc-content-control-btns">
                    <button onClick={prev} className="rpc-prev-btn">Prev</button>
                    <button onClick={next} className="rpc-next-btn">Next</button>
                </div>
            </div>
        ) : ""}
    </div>);
}

export { CarouselWrapper, prev, next, moveTo, switchTo, presentIndex };
