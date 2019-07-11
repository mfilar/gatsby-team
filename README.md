## Instalacja środowiska
```javascript
npm install -g gatsby-cli
```


## Tworzenie nowego projektu

```javascript
gatsby new [rootPath] [starter]
gatsby new gatsby-team https://github.com/gatsbyjs/gatsby-starter-hello-world
```


## Start projektu

```javascript
gatsby develop // visit http://localhost:8000
```


## Routing - katalog `pages`

W tym katalogu każdy dodany plik (komponent) staje się automatycznie nową stroną. Nazwa pliku jest jego URL-em.
Można zagnieżdżać pliki w katalogach, wtedy URL jest tworzony z połączenia nazwy folderu i nazwy pliku.  
Np. jeśli umieścimy katalog `about` w katalogu `pages` i w nim dodamy plik `us.js` to komponent zawarty w pliku `us.js` będzie dostępny pod URL-em `/about/us`


## Globalne style

Aby dodać globalne style do projektu w root'cie naszego projektu należy odnaleźć (bądź stworzyć, jeśli nie ma) plik `gatsby-browser.js`  
Jest to plik specjalny w którym można importować pliki które powinny być dostępne globalnie.

Jeśli nasze globalne style znajdują się w pliku `"./src/assets/global.css"` to do zawartości pliku `gatsby-browser.js` należy dodać następującą linijkę:

```javascript
import "./src/assets/global.css"
```

Aby zobaczyć zmiany wymagany jest restart serwera.


## Stylowanie komponentów

Gatsby posiada out of the box wsparcie dla CSS modules.
Wystarczy stworzyć plik z rozszerzeniem `.module.css` i jeśli go zaimportujemy, nazwy klas automatycznie będą zmieniane na styl CSS modules.

Przykład:

```javascript
import React from "react"
import styles from './header.module.css'; // <--- CSS modules

export default ({ text }) => <h1 className={styles.text}>{ text }</h1>;
```


Inne opcje stylowania dostępne w gatsby to m.in.
- css-in-js
- Typography.js
- Sass
- JSS
- Stylus
- PostCSS



## Pluginy

Gatsby posiada bogaty zestaw plug-in'ów różnego zastosowania, jak np. obróbka obrazków, SEO, PWA.  
Więcej informacji na ten temat można znaleźć [tutaj](https://www.gatsbyjs.org/plugins/). 

Wybrane plug-in'y należy dołączyć w pliku `gatsby-config.js`. Przykład użycia pluginu Typography.js

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```


## GraphQL

Gatsby do operacji na danych dostarcza interfejsu GraphQL-a. Można go znaleźć pod linkiem http://localhost:8000/___graphql gdy mamy uruchomiony sesrwer developerski.



## Dynamiczne tworzenie stron z plików markdown

Potrzebne pluginy:
- gatsby-source-filesystem
- gatsby-transformer-remark

Plik konfiguracyjny:

```javascript
module.exports = {
  plugins: [
    [...],
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`
  ],
}
```


Po uruchomieniu serwera w graphQL-owym API widoczne są dodatkowe parametry:
- allMarkdownRemark
- markdownRemark.


Do tworzenia dynamicznych stron potrzeba wygenerować **slug** pod którym dane będą dostępne i stworzyć **komponent** który będzie je wyświetlać.

```javascript
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  
  // for each markdown file
  if (node.internal.type === `MarkdownRemark`) {
    // generate slug from file name
    const slug = createFilePath({ node, getNode, basePath: `people` })
    
    // and attach additional parameter slug with that generated value to each markdown node
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  
  // query slug for all markdown files  
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    // and create new page for each of the results
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug, // set generated slug as page URL
        component: path.resolve(`./src/components/profile.js`), // component template
        context: { // context data will be available as query parameters in template component
          slug: node.fields.slug,
        },
      })
    })
  })
}
```
