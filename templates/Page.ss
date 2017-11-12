<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <% require themedCSS('style') %>

</head>
<body>

    <% include Header %>

    {$Form}
    {$Layout}

    <% include Footer %>

    <%-- This bundle serves as both the base script for reloading with the dev-server and the final bundle for production --%>
    <% require themedJavascript('dist/bundle') %>
</body>
</html>
