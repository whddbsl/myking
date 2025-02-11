import styled from "styled-components";

interface MapContainerProps {
    dragging: boolean;
}

interface MapImgProps {
    position: { x: number; y: number };
    scale: number;
}

export const MapContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "dragging",
})<MapContainerProps>`
    height: 350px;
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: ${(props) => (props.dragging ? "grabbing" : "grab")};
`;

export const MapImg = styled.img<MapImgProps>`
    position: absolute;
    transform-origin: center;
    object-fit: contain;
    width: 100%;
    height: 100%;
    cursor: grab;
    left: ${(props) => `${props.position.x}px`};
    top: ${(props) => `${props.position.y}px`};
    transform: ${(props) => `scale(${props.scale})`};
`;
