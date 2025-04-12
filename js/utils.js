export async function showLoader(parentEl){
    const res = await fetch("../components/loader.html");
    const loaderHTML = await res.text();
    parentEl.innerHTML = loaderHTML;
}
// export function hideLoader(parentEl){
//     parentEl.innerHTML = "";

// }