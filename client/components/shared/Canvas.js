import { useEffect, useLayoutEffect, useRef } from "react";
import { socket } from "./socket";


const DrawingCanvas = ({ boardId }) => {
    const canvasRef = useRef(null);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
    const shouldDraw = useRef(false);

    useEffect(() => {
        socket.emit('joinBoard', boardId);
    }, [boardId]);

    useLayoutEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x, y) => {
            context.beginPath();
            context.moveTo(x, y);
        };

        const drawLine = (x, y) => {
            context.lineTo(x, y);
            context.stroke();
        };

        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            const x = e.clientX || e.touches[0].clientX;
            const y = e.clientY || e.touches[0].clientY;
            beginPath(x, y);
            socket.emit('beginPath', { boardId, x, y });
        };

        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            const x = e.clientX || e.touches[0].clientX;
            const y = e.clientY || e.touches[0].clientY;
            drawLine(x, y);
            socket.emit('drawLine', { boardId, x, y });
        };

        const handleMouseUp = () => {
            shouldDraw.current = false;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
        };

        const handleBeginPath = (path) => {
            beginPath(path.x, path.y);
        };

        const handleDrawLine = (path) => {
            drawLine(path.x, path.y);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        canvas.addEventListener('touchstart', handleMouseDown);
        canvas.addEventListener('touchmove', handleMouseMove);
        canvas.addEventListener('touchend', handleMouseUp);

        socket.on('beginPath', handleBeginPath);
        socket.on('drawLine', handleDrawLine);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);

            canvas.removeEventListener('touchstart', handleMouseDown);
            canvas.removeEventListener('touchmove', handleMouseMove);
            canvas.removeEventListener('touchend', handleMouseUp);

            socket.off('beginPath', handleBeginPath);
            socket.off('drawLine', handleDrawLine);
        };
    }, [boardId]);

    return <canvas ref={canvasRef}></canvas>;
};

export default DrawingCanvas;
