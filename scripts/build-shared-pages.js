const fs = require('node:fs');
const path = require('node:path');
const { minify } = require('html-minifier-terser');

const root = path.resolve(__dirname, '..');
const sourceDirectory = path.join(root, 'src');
const outputDirectory = path.join(root, 'docs');
const headerTemplate = fs.readFileSync(path.join(sourceDirectory, 'partials/header.html'), 'utf8');
const footerTemplate = fs.readFileSync(path.join(sourceDirectory, 'partials/footer.html'), 'utf8');
const sharedShellStyles = fs.readFileSync(path.join(sourceDirectory, 'partials/shared-shell.css'), 'utf8');
const siteLoaderMarkup = fs.readFileSync(path.join(sourceDirectory, 'partials/site-loader.html'), 'utf8');
const siteLoaderStyles = fs.readFileSync(path.join(sourceDirectory, 'partials/site-loader.css'), 'utf8');
const siteLoaderScript = fs.readFileSync(path.join(sourceDirectory, 'partials/site-loader.js'), 'utf8');
const minifierOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeAttributeQuotes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
};

const routes = {
  home: {
    directory: '',
    urls: { HOME: '#home', ABOUT: '#behind-blueprint', SERVICES: 'services/', PROJECTS: 'projects/', CONTACT: '#contact', BOOKING: 'book-a-call/' },
    active: 'HOME',
  },
  services: {
    directory: 'services',
    urls: { HOME: '../#home', ABOUT: '../#behind-blueprint', SERVICES: './', PROJECTS: '../projects/', CONTACT: '../#contact', BOOKING: '../book-a-call/' },
    active: 'SERVICES',
  },
  projects: {
    directory: 'projects',
    urls: { HOME: '../#home', ABOUT: '../#behind-blueprint', SERVICES: '../services/', PROJECTS: './', CONTACT: '../#contact', BOOKING: '../book-a-call/' },
    active: 'PROJECTS',
  },
  booking: {
    directory: 'book-a-call',
    urls: { HOME: '../#home', ABOUT: '../#behind-blueprint', SERVICES: '../services/', PROJECTS: '../projects/', CONTACT: '../#contact', BOOKING: './' },
    active: 'BOOKING',
  },
};

function renderPartial(template, route) {
  let markup = template;
  for (const [key, value] of Object.entries(route.urls)) {
    markup = markup.replaceAll(`{{${key}_URL}}`, value);
    markup = markup.replaceAll(`{{${key}_CURRENT}}`, route.active === key ? ' aria-current="page"' : '');
  }
  return markup;
}

async function buildPage(sourcePath, route) {
  let html = fs.readFileSync(sourcePath, 'utf8');
  const headerMarker = '<!-- SHARED_HEADER -->';
  const footerMarker = '<!-- SHARED_FOOTER -->';
  const loaderMarker = '<!-- SITE_LOADER -->';
  if (!html.includes(headerMarker) || !html.includes(footerMarker) || !html.includes(loaderMarker)) {
    throw new Error(`${path.relative(root, sourcePath)} is missing a shared shell or loader marker.`);
  }
  html = html
    .replace(headerMarker, renderPartial(headerTemplate, route))
    .replace(footerMarker, renderPartial(footerTemplate, route))
    .replace(loaderMarker, siteLoaderMarkup)
    .replace('<!-- PAGE_RUNTIME -->', '');
  html = html.replace('</head>', `<style>${sharedShellStyles}\n${siteLoaderStyles}</style>\n</head>`);
  html = html.replace('</body>', `<script>${siteLoaderScript}</script>\n</body>`);
  const outputPath = path.join(outputDirectory, route.directory, 'index.html');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, await minify(html, minifierOptions));
  console.log(`Built ${path.relative(root, outputPath)}.`);
}

async function main() {
  await buildPage(path.join(sourceDirectory, 'index.html'), routes.home);
  await buildPage(path.join(sourceDirectory, 'services/index.html'), routes.services);
  const serviceHardware = path.join(sourceDirectory, 'services/laptop-hardware.png');
  const serviceHardwareOutput = path.join(outputDirectory, 'services/laptop-hardware.png');
  fs.copyFileSync(serviceHardware, serviceHardwareOutput);
  await buildPage(path.join(sourceDirectory, 'projects/index.html'), routes.projects);
  await buildPage(path.join(sourceDirectory, 'book-a-call/index.html'), routes.booking);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
