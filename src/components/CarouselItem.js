import React, {useEffect, useRef} from 'react';

function CarouselItem({children, mode, index, items}) {
    const itemRef = useRef(), interval = useRef();
    let isMouseDown = false;

    useEffect(() => {
        clearInterval(interval.current);
        const reactToStyle = () => {
            let rpc_content_wrapper = itemRef.current.parentElement.parentElement;
            let rpc_content_wrapper_pos_x = Math.abs(parseInt(rpc_content_wrapper.style.transform.substring(rpc_content_wrapper.style.transform.indexOf("(") + 1, rpc_content_wrapper.style.transform.indexOf(")"))));
            let width = rpc_content_wrapper.clientWidth / items;
            itemRef.current.style.width = Math.floor(width) + "px";
            switch (mode) {
                case 'gallery': 
                    if(rpc_content_wrapper_pos_x >= 0) {
                        const mid = Math.floor((rpc_content_wrapper_pos_x) + (items * width / 2));
                        const itemMid = Math.floor((index * width) + (width / 2));
    
                        if(isMouseDown)
                            itemRef.current.style.transition = '0s';
                        else 
                            itemRef.current.style.transition = '.3s';
                            
                        itemRef.current.style.transform = `scale(${Math.abs(1 - Math.abs((Math.abs(mid - itemMid)/10000) * 4))})`;
                    }
                    // console.log(rpc_content_wrapper_pos_x);
                    
                    break;
                default:
    
            }
        }

        interval.current = setInterval(reactToStyle, 10);
    }, [items]);
    useEffect(() => {
        window.addEventListener("mousedown",() => isMouseDown = true);
        window.addEventListener("mouseup",() => isMouseDown = false);
        window.addEventListener("touchstart",() => isMouseDown = true);
        window.addEventListener("touchend",() => isMouseDown = false);
    }, [items, children]);
    
    return (
        <div className="rpc-content-item" ref={itemRef}>
            {children}
        </div>
    )
}

export { CarouselItem };
