// Toggle css class on specific element, usage example:
// <a onclick='toggleClass(`myButton`, `newCssClass`)'
function toggleClass(elClass, toggleClass) {
    let myEl = document.getElementsByClassName(elClass);
    let myElClassName = myEl[0].className;

    if(myElClassName.indexOf(toggleClass) === -1) {
        myEl[0].className=`${myElClassName} ${toggleClass}`;
    } else {
        myEl[0].className=myElClassName.replace(toggleClass, '').trim();
    }

    return false;
}

function copyToClipboard(el) {
    var text = el.children[0].textContent;
    navigator.clipboard.writeText(text);
}
