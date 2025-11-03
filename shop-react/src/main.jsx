import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";

let text = "طراحی و توسعه توسط آرشام سراجی";
let i = 0;
let isDeleting = false;

// function typeEffect() {
//     console.clear();

//     // اگر در حال نوشتن باشیم
//     if (!isDeleting) {
//         console.log(
//             "%c" + text.substring(0, i),
//             "color: #fff; background-color:#4849c9; font-size:18px; font-weight:bold; padding:10px; border-radius:7px; border: 2px double #fff;"
//         );
//         if (i < text.length) {
//             i++;
//             setTimeout(typeEffect, 150); // سرعت تایپ
//         } else {
//             // وقتی نوشتن کامل شد، چند ثانیه وایسه
//             setTimeout(() => {
//                 isDeleting = true;
//                 typeEffect();
//             }, 2000); // مدت مکث
//         }
//     } else {
//         // در حال پاک کردن متن
//         console.log(
//             "%c" + text.substring(0, i),
//             "color: #fff; background-color:#4849c9; font-size:18px; font-weight:bold; padding:10px; border-radius:7px; border: 2px double #fff;"
//         );
//         if (i > 0) {
//             i--;
//             setTimeout(typeEffect, 100); // سرعت پاک شدن
//         } else {
//             isDeleting = false;
//             setTimeout(typeEffect, 500); // فاصله قبل از تایپ دوباره
//         }
//     }
// }

// typeEffect();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ProductsProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ProductsProvider>
    </StrictMode>
);
