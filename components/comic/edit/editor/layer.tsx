import React, { useState } from "react";
import { Rnd, RndResizeCallback, RndResizeStartCallback, RndDragCallback } from "react-rnd";
import { useComicContext } from "../../../../context/comiccontext";
import * as Styled from "./styles";

interface Props {
    layer: Record<any, any>;
    index: number;
    selected: boolean;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
    zoom: number;
}

const Layer: React.FC<Props> = props => {
    const { layer, index, selected, setSelected, zoom } = props;
    const { newdo } = useComicContext();

    const [tempResizeWidth, setTempResizeWidth] = useState(0);
    const [tempResizeHeight, setTempResizeHeight] = useState(0);
    const [tempTop, setTempTop] = useState(0);
    const [tempLeft, setTempLeft] = useState(0);

    const onRndDrag: RndDragCallback = (e, data) => {
        layer.properties.left += data.deltaX;
        layer.properties.top += data.deltaY;
    };

    const onRndDragStop: RndDragCallback = (e, data) => {
        e.stopPropagation();
        e.preventDefault();
        newdo("moveLayer", { index, dx: data.x, dy: data.y }); // TODO: replace with the correct deltas
    };

    const onResizeStart: RndResizeStartCallback = (e, dir, ref) => {};

    const onResize: RndResizeCallback = (e, dir, refToElement, delta, position) => {
        layer.properties.width += delta.width;
        layer.properties.height += delta.height;
    };

    const onResizeStop: RndResizeCallback = (e, dir, refToElement, delta, position) => {};

    return (
        <Rnd
            key={index}
            data-key={index}
            bounds=".editorSpace"
            className="grabbable"
            resizeHandleClasses={{
                bottomLeft: "resizer",
                bottomRight: "resizer",
                topLeft: "resizer",
                topRight: "resizer",
                top: "hor-sizer",
                right: "vert-sizer",
                bottom: "hor-sizer",
                left: "vert-sizer",
            }}
            size={{
                width: layer.width,
                height: layer.height,
            }}
            position={{ x: layer.x, y: layer.y }}
            enableResizing={
                selected
                    ? {
                          top: true,
                          right: true,
                          bottom: true,
                          left: true,
                          topRight: true,
                          bottomRight: true,
                          bottomLeft: true,
                          topLeft: true,
                      }
                    : {}
            }
            disableDragging={!selected}
            // resizeGrid={grid ? [gridValue, gridValue] : null}
            // dragGrid={grid ? [gridValue, gridValue] : null}
            scale={zoom}
            onMouseDown={e => {
                console.log(`Selected Index: ${index}`);
                e.stopPropagation();
                e.preventDefault();
                setSelected(index);
            }}
            onDragStart={e => e.stopPropagation()}
            onDrag={onRndDrag}
            onDragStop={onRndDragStop}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeStop={onResizeStop}
        >
            {props.children}
        </Rnd>
    );
};
export default Layer;
