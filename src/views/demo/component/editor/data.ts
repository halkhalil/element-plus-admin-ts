export const jsonData = `{
  "name": "element-plus-admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "@vueuse/core": "^4.9.1",
    "axios": "^0.21.1",
    "codemirror": "^5.62.0",
    "core-js": "^3.6.5",
    "css-color-function": "^1.3.3",
    "element-plus": "^1.0.2-beta.48",
    "lodash": "^4.17.21",
    "nprogress": "^0.2.0",
    "v-contextmenu": "^3.0.0-alpha.4",
    "vue": "^3.0.0",
    "vue-router": "^4.0.0-0",
    "vuex": "4.0",
    "vuex-persistedstate": "^4.0.0-beta.3"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-eslint": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-plugin-vuex": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "@vue/compiler-sfc": "^3.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^7.0.0-0",
    "mockjs": "^1.1.0",
    "sass": "^1.27.0",
    "sass-loader": "^10.0.4",
    "vue-cli-plugin-element-plus": "~0.0.13"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
      "no-console": "off",
      "no-unused-vars": "off",
      "vue/no-unused-components": "off",
      "no-unreachable": "off",
      "no-debugger": "off"
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
}
`;

export const htmlData = `<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src="https://unpkg.com/vue@next"></script>
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css">
    <!-- import JavaScript -->
    <script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
    <title>Element Plus demo</title>
  </head>
  <body>
    <div id="app">
      <el-button>{{ message }}</el-button>
    </div>
    <script>
      const App = {
        data() {
          return {
            message: "Hello Element Plus",
          };
        },
      };
      const app = Vue.createApp(App);
      app.use(ElementPlus);
      app.mount("#app");
    </script>
  </body>
</html>
`;
export const javascriptData = `import Vue from 'vue'
import ElementPlus from 'element-plus'
import './element-variables.scss'
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus)`;

export const markdownData = `# element-plus-admin

## Project setup
\`\`\`
yarn install
\`\`\`

### Compiles and hot-reloads for development
\`\`\`
yarn serve
\`\`\`

### Compiles and minifies for production
\`\`\`
yarn build
\`\`\`

### Lints and fixes files
\`\`\`
yarn lint
\`\`\`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
`;

export const richContent = `
      <p><img style="display: block; margin-left: auto; margin-right: auto;" title="Tiny Logo" src="https://v3.cn.vuejs.org/logo.png" alt="vue Logo" width="128" height="128" /></p>
  <h2 style="text-align: center;">Welcome to the TinyMCE Cloud demo!</h2>
  <h5 style="text-align: center;">Note, this includes some "enterprise/premium" features.<br>Visit the <a href="https://www.tiny.cloud/pricing">pricing page</a> to learn more about our premium plugins.</h5>
  <p>Please try out the features provided in this full featured example.</p>

  <h2>Got questions or need help?</h2>
  <ul>
    <li>Our <a class="mceNonEditable" href="//www.tiny.cloud/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
    <li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>
    <li>We also offer enterprise grade support as part of <a href="https://www.tiny.cloud/pricing">TinyMCE premium subscriptions</a>.</li>
  </ul>

  <h2>A simple table to play with</h2>
  <table style="border-collapse: collapse; width: 100%;" border="1">
    <thead>
      <tr>
        <th>Product</th>
        <th>Cost</th>
        <th>Really?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TinyMCE Cloud</td>
        <td>Get started for free</td>
        <td>YES!</td>
      </tr>
      <tr>
        <td>Plupload</td>
        <td>Free</td>
        <td>YES!</td>
      </tr>
    </tbody>
  </table>

  <h2>Found a bug?</h2>
  <p>If you think you have found a bug please create an issue on the <a href="https://github.com/tinymce/tinymce/issues">GitHub repo</a> to report it to the developers.</p>

  <h2>Finally ...</h2>
  <p>Don't forget to check out our other product <a href="http://www.plupload.com" target="_blank">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>
  <p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br>All the best from the TinyMCE team.</p>
`