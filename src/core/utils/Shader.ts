export function shaderFromDomSrc(elmID: string) {
    const elm = document.getElementById(elmID);

    if (!elm || elm.textContent === '') {
        console.warn(`Element ${elmID} not found or text is empty`);
        return null;
    }

    return elm.textContent.trim();
}