(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,function(e,a,t){e.exports=t(22)},,,,,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(6),l=t.n(c),o=(t(15),t(16),t(2));t(17);var s=()=>(Object(r.useEffect)(()=>{const e=()=>{console.log("Scroll event triggered");const e=document.querySelector(".home-container");window.scrollY>50?(console.log("Adding 'scrolled' class"),e.classList.add("scrolled")):(console.log("Removing 'scrolled' class"),e.classList.remove("scrolled"))};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[]),n.a.createElement("div",{className:"home-container"},n.a.createElement("div",{className:"hero-section"},n.a.createElement("h1",null,"Welcome to SpyAuto"),n.a.createElement("p",null,"Your one-stop shop for buying and inquiring about cars!"),n.a.createElement("p",null,"Explore our wide range of vehicles.")),n.a.createElement("div",{className:"contact-section"},n.a.createElement("button",{className:"contact-button",onClick:()=>window.location.href="mailto:luispencergarcia@gmail.com"},"Contact Us"))));t(18);var i=()=>{const[e,a]=Object(r.useState)([]);Object(r.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/cars"),t=await e.json();a(t)}catch(e){console.error("Error fetching cars:",e)}})()},[]);return n.a.createElement("div",{className:"car-listing"},n.a.createElement("h1",null,"Available Cars"),n.a.createElement("div",{className:"car-table"},e.map(e=>n.a.createElement("div",{className:"car-card",key:e.id},n.a.createElement("img",{src:e.imageUrl,alt:`${e.name} ${e.model}`,className:"car-image"}),n.a.createElement("h2",null,e.name," ",e.model),n.a.createElement("p",{className:"car-year-price"},"Cost: ",e.year,"  $",e.price),n.a.createElement("div",{className:"car-options"},n.a.createElement("button",{className:"option-button",onClick:()=>(async e=>{try{const a=await fetch("/api/cart",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({car:{id:e},quantity:1})});if(a.ok)alert("Car added to cart!");else{const e=await a.text();console.error("Failed to add car to cart",a.status,e),alert(`Failed to add car to cart. Status: ${a.status}, Error: ${e}`)}}catch(a){console.error("Error adding car to cart:",a),alert("An error occurred. Check console for details.")}})(e.id)},"Send to Cart"))))))};t(19);var m=()=>{const[e,a]=Object(r.useState)([]),[t,c]=Object(r.useState)(0);Object(r.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/cart"),t=await e.json();a(t),l(t)}catch(e){console.error("Error fetching cart items:",e)}})()},[]);const l=e=>{const a=e.reduce((e,a)=>e+a.car.price*a.quantity,0);c(a)};return n.a.createElement("div",{className:"cart-container"},n.a.createElement("h1",{className:"cart-header"},"Your Cart"),0===e.length?n.a.createElement("p",null,"No cars added to the cart yet."):n.a.createElement("div",{className:"cart-grid"},e.map((t,r)=>n.a.createElement("div",{key:r,className:"cart-card"},n.a.createElement("img",{src:t.car.imageUrl||"placeholder.jpg",alt:`${t.car.name} ${t.car.model}`,className:"cart-card-image"}),n.a.createElement("div",{className:"cart-card-details"},n.a.createElement("h2",{className:"cart-card-name"},t.car.name," ",t.car.model),n.a.createElement("p",{className:"cart-card-price"},"$",t.car.price),n.a.createElement("p",{className:"cart-card-quantity"},"Quantity: ",t.quantity),n.a.createElement("button",{onClick:()=>(async t=>{try{const r=await fetch("/api/cart/"+t,{method:"DELETE"});if(r.ok){const r=e.filter(e=>e.id!==t);a(r),alert("Item removed from cart!")}else console.error("Failed to remove item from cart",r.status),alert("Failed to remove item from cart.")}catch(r){console.error("Error deleting item from cart:",r)}})(t.id),className:"delete-button"},"Remove"))))),n.a.createElement("div",{className:"cart-total"},"Total: $",t.toFixed(2)),n.a.createElement("button",{className:"checkout-button"},"Checkout"))};t(20);var u=()=>{const[e,a]=Object(r.useState)({name:"",password:""}),[t,c]=Object(r.useState)(""),[l,o]=Object(r.useState)(!1),s=t=>{a({...e,[t.target.name]:t.target.value})};return n.a.createElement("div",{className:"login-container"},n.a.createElement("div",{className:"login-form"},n.a.createElement("h1",null,l?"Sign Up":"Log In"),n.a.createElement("form",{onSubmit:async a=>{if(a.preventDefault(),console.log("Form submission triggered"),!e.name.trim()||!e.password.trim())return c("Username and password cannot be blank."),void console.log("Validation failed: Blank username or password");const t="/auth/"+(l?"signup":"login");console.log("API URL:",t);try{const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});console.log("Response status:",a.status),409===a.status?c(`Username "${e.name}" already exists. Please choose another one.`):401===a.status?c("Invalid username or password."):a.ok?c(l?"User registered successfully!":"Login successful!"):c("An unexpected error occurred. Please try again later.")}catch(r){console.error("Error during login/signup:",r),c("An error occurred while processing your request. Please try again later.")}}},n.a.createElement("label",null,"Username:"),n.a.createElement("input",{type:"text",name:"name",value:e.name,onChange:s,placeholder:"Enter your username",required:!0}),n.a.createElement("label",null,"Password:"),n.a.createElement("input",{type:"password",name:"password",value:e.password,onChange:s,placeholder:"Enter your password",required:!0}),n.a.createElement("button",{type:"submit"},l?"Sign Up":"Log In")),n.a.createElement("p",{className:"toggle-text",onClick:()=>o(!l)},l?"Have an account? Log in":"Don't have an account? Sign up"),t&&n.a.createElement("p",{className:"message"},t)))};var d=function(){return n.a.createElement("div",{className:"app-container"},n.a.createElement(o.c,null,n.a.createElement(o.a,{path:"/",element:n.a.createElement(s,null)}),n.a.createElement(o.a,{path:"/cars",element:n.a.createElement(i,null)}),n.a.createElement(o.a,{path:"/cart",element:n.a.createElement(m,null)}),n.a.createElement(o.a,{path:"/Login",element:n.a.createElement(u,null)})))},E=t(3);t(21);var p=()=>n.a.createElement("nav",{className:"navbar"},n.a.createElement("div",{className:"navbar-logo"},"SpyAuto"),n.a.createElement("ul",{className:"navbar-links"},n.a.createElement("li",null,n.a.createElement(E.b,{to:"/"},"Home")),n.a.createElement("li",null,n.a.createElement(E.b,{to:"/cars"},"Cars")),n.a.createElement("li",null,n.a.createElement(E.b,{to:"/cart"},"Cart")),n.a.createElement("li",null,n.a.createElement(E.b,{to:"/Login"},"Sign in"))));var g=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,23)).then(a=>{let{getCLS:t,getFID:r,getFCP:n,getLCP:c,getTTFB:l}=a;t(e),r(e),n(e),c(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(E.a,null,n.a.createElement(p,null)," ",n.a.createElement(d,null)," "))),g()}],[[7,1,2]]]);
//# sourceMappingURL=main.0d438308.chunk.js.map