"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";

export default function MapPage() {
    const [scale, setScale] = useState<number>(1);
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [dragging, setDragging] = useState<boolean>(false);
    const [start, setStart] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [bounds, setBounds] = useState<{
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    }>({
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
    });

    const mapRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 이미지 크기 및 이동 가능한 최대/최소 범위 계산
    useEffect(() => {
        if (mapRef.current && containerRef.current) {
            const container = containerRef.current.getBoundingClientRect();
            const imgWidth = container.width * scale;
            const imgHeight = container.height * scale;

            const minX = Math.min(0, (container.width - imgWidth) / 2);
            const maxX = Math.max(0, (imgWidth - container.width) / 2);
            const minY = Math.min(0, (container.height - imgHeight) / 2);
            const maxY = Math.max(0, (imgHeight - container.height) / 2);

            setBounds({ minX, maxX, minY, maxY });

            if (scale === 1) {
                setPosition({ x: 0, y: 0 });
            }
        }
    }, [scale]);

    // 마우스 휠 줌 기능
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const zoomFactor = 0.1;
        const newScale = Math.min(
            3,
            Math.max(1, scale + (e.deltaY > 0 ? -zoomFactor : zoomFactor))
        );

        setScale(newScale);

        if (newScale === 1) {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
        setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!dragging) return;

        let newX = e.clientX - start.x;
        let newY = e.clientY - start.y;

        if (scale === 1) {
            newX = 0;
            newY = 0;
        } else {
            newX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
            newY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));
        }

        setPosition({ x: newX, y: newY });
    };

    // 드래그 종료
    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            ref={containerRef}
            style={{
                height: "350px",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                cursor: dragging ? "grabbing" : "grab",
            }}
            onWheel={handleWheel as any} // TypeScript에서 WheelEvent 경고 방지
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <img
                ref={mapRef}
                src="/images/map.png"
                alt="map"
                style={{
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "center",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                }}
            />
        </div>
    );
}
