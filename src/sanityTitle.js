const decodeEntities = (() => {
    // this prevents any overhead from creating the object each time
    let element = document.createElement('div');

    function decodeHTMLEntities(str) {
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();

function sanityTitle(title = "", decode = true, removeBraces = true) {
    if (decode && removeBraces)
        return decodeEntities(title.replace(/\(.*\)/gi, ''));
    else if (decode)
        return decodeEntities(title);
    else if (removeBraces)
        return title.replace(/\(.*\)/gi, '');
    else
        return title;
}

export default sanityTitle;