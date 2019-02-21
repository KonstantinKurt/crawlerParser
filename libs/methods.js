let splitUrl = function (url, param) {
    let tempArray = url.split('/');
    switch (param) {
        case "id":
            return tempArray[4];
            break;
        case "name":
            return tempArray[5].slice(0, -5);
            break;
        default:
            break;
    }
};

module.exports = {
	splitUrl: splitUrl,
};