import React from "react";
import ReactDOM from "react-dom";
import Upper from "./upper";
import "../css/style.css";


document.addEventListener('DOMContentLoaded',()=>{
    var element_dynamic = document.getElementById('dynamic');
    var root_dynamic = ReactDOM.createRoot(element_dynamic);
    root_dynamic.render(
        <React.StrictMode>
            <Upper/>
        </React.StrictMode>
    )
})