// Dependencies
const pages = require('./pages');
const selectors = require('./selectors');
const scope = require('./scope');

// Defines whether puppeteer runs Chrome in headless mode.
let headless = false;
let args=["--no-sandbox"]
let slowMo = 0;
// Chrome is set to run headlessly and with no slowdown in CircleCI
// if (process.env.CIRCLECI) headless = true;
// if (process.env.CIRCLECI) slowMo = 0;

const pending = callback => {
  callback(null, 'pending');
};


const visitLoginPage = async () => {
  if (!scope.browser)
    scope.browser = await scope.driver.launch({ headless, slowMo, args });
  scope.context.currentPage = await scope.browser.newPage();
  const url = scope.host 
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2'
  });
  await delay(2000)
  return visit;
};

// This action is used to click on an HTML element given in the selectors
const clickOnItem = async link => {
  const { currentPage } = scope.context;
  return await currentPage.click(selectors.links[link]);
};


// This action is used to fill in a input field having a 'placeholder'
const fillInFormFieldwithPlaceholder = async (field, value) => {
  const { currentPage } = scope.context;
  const fieldPresent = await currentPage.waitForSelector(
    `input[placeholder="${field}"]`
  );
  await fieldPresent;
  await currentPage.focus(`input[placeholder="${field}"]`);
  await currentPage.type(`input[placeholder="${field}"]`, value, { delay: 1 });
  return;
};


// This action is used to click on an 'button' element given in the selectors
const pressButton = async button => {
  const { currentPage } = scope.context;
  return await currentPage.click(selectors.buttons[button]);
};


const clickDropDown = async (option, value) => {
  const { currentPage } = scope.context;
  return await currentPage.select(`select[name='${value}']`, option);
}

// This action is used to verify that we are on a given page or not
const shouldBeOnPage = async pageName => {
  const url = scope.host + pages[pageName];
  const urlMatched = scope.context.currentPage.waitForFunction(
    `window.location.href === '${url}'`,
    { mutation: true }
  );
  await urlMatched;
};

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));


// This action is used to wait on a page for a given amount of time in msec
const wait = async timeInSeconds => {
  const time = parseInt(timeInSeconds) * 1000;
  await delay(time);
};

module.exports = {
  pending,
  headless,
  clickOnItem,
  fillInFormFieldwithPlaceholder,
  pressButton,
  shouldBeOnPage,
  wait,
  visitLoginPage,
  clickDropDown
};
