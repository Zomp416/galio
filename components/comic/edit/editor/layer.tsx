import React from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";
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

    const onRndDragStop: RndDragCallback = (e, data) => {
        e.stopPropagation();
        e.preventDefault();
        newdo("moveLayer", { index, x: data.x, y: data.y });
    };

    const onResizeStop: RndResizeCallback = (e, dir, refToElement, delta, position) => {
        newdo("resizeLayer", {
            index,
            dw: delta.width,
            dh: delta.height,
            x: position.x,
            y: position.y,
        });
    };

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
            scale={zoom}
            onMouseDown={e => {
                console.log(`Selected Index: ${index}`);
                e.stopPropagation();
                e.preventDefault();
                setSelected(index);
            }}
            onDragStart={e => e.stopPropagation()}
            onDragStop={onRndDragStop}
            onResizeStop={onResizeStop}
        >
            {props.children}
        </Rnd>
    );
};
export default Layer;
