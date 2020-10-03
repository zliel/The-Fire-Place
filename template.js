export default ({markup, css}) => {
    return `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>MERN Skeleton</title>
                <style id="jss-server-side">${css}</style>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
 
            </head>
            <body>
                <div id="root">${markup}</div>
                
                <script type="text/javascript" src="/dist/bundle.js"></script>
            </body>
        </html>`
}