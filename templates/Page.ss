<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <% include Header %>

    {$Form}
    {$Layout}

    <% include Footer %>

    <%-- Bundle file, could also be included using the Requirements API--%>

    <%-- Once in production you can access the js and css files using
         their respective tags rather than including the full bundle --%>
    <script src="{$BaseURL}{$ThemeDir}/dist/bundle.js" charset="utf-8"></script>
</body>
</html>
