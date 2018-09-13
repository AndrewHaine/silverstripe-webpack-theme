<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="themes/ss-webpack/css/main.css">


</head>
<body>

    <% include Header %>

    {$Form}
    {$Layout}

    <% include Footer %>

    <%-- This bundle serves as both the base script for reloading with the dev-server and the final bundle for production --%>

    <script async defer src="themes/ss-webpack/javascript/vendors/vendors.js"></script>
    <script async defer src="themes/ss-webpack/javascript/dist/main.bundle.js"></script>
</body>
</html>
