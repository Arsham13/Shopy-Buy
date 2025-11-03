import React, { useState, useEffect } from "react";

function TypeWriter({ text, speed = 100 }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed + Math.random() * speed); // سرعت کمی تصادفی برای طبیعی بودن

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return (
        <div
        >
            <div>{displayedText}</div>
        </div>
    );
}

export default TypeWriter;
