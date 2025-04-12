export async function loadLayout(){
    const header = await fetch("/components/header.html");
    const footer = await fetch("/components/footer.html");

    document.body.insertAdjacentHTML("afterbegin", await header.text());
    document.body.insertAdjacentHTML("beforeend", await footer.text());
}