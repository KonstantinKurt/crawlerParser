module.exports = function(name,link) {
    return `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
</head>

<body>
    <div>
        <p>Greetings <span style="color: red">${name}</span>!</p>
        <p>We're pleased to welcome you to our Crawler!</p>
        <p><a href=${link}>${link}</a></p>
    </div>
</body>

</html>`
};