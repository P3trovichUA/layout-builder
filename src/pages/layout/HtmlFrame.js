import React from 'react';

export default ({title, children}) => (
  <html lang="uk">
  <head>
    <meta charSet="utf-8"/>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400&amp;subset=cyrillic"/>
    <link rel="stylesheet" href="/styles.css"/>
  </head>
  <body>
  {children}
  </body>
  </html>
);
