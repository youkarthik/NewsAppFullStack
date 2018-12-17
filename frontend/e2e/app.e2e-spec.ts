import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('News App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  browser.driver.manage().window().maximize();

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('News Application');
  });

  it('should be redirected to /home url on load', () => {
    expect(browser.getCurrentUrl()).toContain('/home');
  });

  it('should have a section for headline news', () => {
    const helement = browser.element(by.id('headlines'));
    expect(helement.isPresent()).toBeTruthy();
    expect(helement.getText()).toContain('Headline News');
  });

  it('should have a section for cateogry news', () => {
    const celement = browser.element(by.id('category'));
    expect(celement.isPresent()).toBeTruthy();
    expect(celement.getText()).toContain('Category News');
  });

  it('should have a cards inside headline section', () => {
    const parent = browser.element(by.id('headlines'));
    const headlinecards = parent.all(by.css('.news-card'));
    expect(headlinecards.count()).toBeGreaterThan(2);

    const firstCard = headlinecards.first();
    expect(firstCard.element(by.css('.news-title')).isPresent()).toBeTruthy();
    expect(firstCard.element(by.css('.news-text')).isPresent()).toBeTruthy();
    expect(firstCard.element(by.css('.news-poster')).isPresent()).toBeTruthy();
  });

  it('should have a cards inside category section', () => {
    const parent = browser.element(by.id('category'));
    const headlinecards = parent.all(by.css('.news-card'));
    expect(headlinecards.count()).toBeGreaterThan(2);

    const firstCard = headlinecards.first();
    expect(firstCard.element(by.css('.news-title')).isPresent()).toBeTruthy();
    expect(firstCard.element(by.css('.news-text')).isPresent()).toBeTruthy();
    expect(firstCard.element(by.css('.news-poster')).isPresent()).toBeTruthy();
  });

  it('should load news in category section after change in category', () => {
    browser.element(by.css('.category-drop-down')).click();
    browser.waitForAngular();
    browser.driver.sleep(500);
    browser.element(by.cssContainingText('.mat-option-text', 'Entertainment')).click();
    browser.waitForAngular();
    browser.driver.sleep(500);
    const parent = browser.element(by.id('category'));
    const headlinecards = parent.all(by.css('.news-card'));
    expect(headlinecards.count()).toBeGreaterThan(2);
    browser.driver.sleep(500);

  });

  it('should get news results for a search texxt', () => {
    browser.element(by.id('search-text')).sendKeys('Chennai');
    browser.waitForAngular();
    browser.driver.sleep(500);
    browser.element(by.id('search-btn')).click();
    browser.waitForAngular();
    browser.driver.sleep(500);
    expect(browser.getCurrentUrl()).toContain('search');
    expect(browser.getCurrentUrl()).toContain('Chennai');
    const searchresultcards = browser.element.all(by.css('.news-card'));
    expect(searchresultcards.count()).toBeGreaterThan(2);
    browser.driver.sleep(2000);
  });

  it('should be able to add news to favorites', () => {
    browser.element(by.css('.clsBtnDashboard')).click();
    browser.waitForAngular();
    browser.driver.sleep(500);

    const nonfavnews = browser.element.all(by.css('.favorite-btn')).first();
    nonfavnews.click();
    browser.waitForAngular();
    browser.driver.sleep(500);

    const unFavElemCount = browser.element.all(by.css('.unfavorite-btn')).count();
    expect(unFavElemCount).toBeGreaterThan(0);
    browser.driver.sleep(1000);
  });

  it('should be able to view the news added to Favorites', () => {

    browser.element(by.css('.clsBtnFavorites')).click();
    browser.waitForAngular();
    browser.driver.sleep(500);

    const felement = browser.element(by.id('favorites'));
    expect(felement.isPresent()).toBeTruthy();
    expect(browser.getCurrentUrl()).toContain('favorites');

    const newscards = browser.element.all(by.css('.news-card'));
    expect(newscards.count()).toBeGreaterThan(0);
    browser.driver.sleep(1000);
  });

  it('should be able to remove the news added to Favorites', () => {
    const newscards = browser.element.all(by.css('.news-card'));
    newscards.count().then(function (initCount) {
      newscards.first().element(by.css('.unfavorite-btn')).click();
      browser.waitForAngular();
      browser.driver.sleep(1000);
      const newscardsNew = browser.element.all(by.css('.news-card'));
      expect(newscardsNew.count()).toBeLessThan(initCount);
    });
  });

  browser.driver.sleep(2000);
});
