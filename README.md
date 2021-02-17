# carnets-vanille-headless

Questions:
 - During generate, could i make use of the store after the first page is generated ? Instead of every route calling store thus the API again?

### Todo

- Env:
  - [] Set MAX_NUMBER_QUERY in an environment variable
  - [] Set API_URL in an environment variable

- Theme
  - [x] Default Style for Font
  - [] Default Style for Gutenberg Element

- Pages
  - [x] Query and display page the same way as post

- Posts
  - [] Query and display Tags taxonomy the same way as Categories
  - [x] Display thumbnail

- SEO
  - [] Create a service/module/plugin to deal with all of it
  - [] Query Home SEO Settings from Yoast
  - [] Query Fb & Twitter Meta from Yoast
  - [x] Query SEO meta & thumbnail for Posts > Categories
  - [] Query SEO meta & thumbnail for Tags > Tags
  - [x] Add Rel link on paginated pages
  - [] Create Sitemap.xml
  - [] Create Robot.xml
  - [] Add Structured Data

- Menu
  - [x] Query Menu from WP
