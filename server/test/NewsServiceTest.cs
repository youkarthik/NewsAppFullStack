using Microsoft.Extensions.Options;
using Moq;
using server.DataAccess;
using server.Models;
using server.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace test
{
    public class NewsServiceTest
    {
        private readonly Mock<INewsRepository> mockNewsRepository;

        public NewsServiceTest()
        {
            mockNewsRepository = new Mock<INewsRepository>();
        }

        #region Positive Tests
        [Fact]
        public void Get_ShouldReturnNewsListAsExpected()
        {
            // Arrange
            mockNewsRepository.Setup(x => x.GetAllNews()).Returns(this.GetNews);
            var service = new NewsService(Options.Create(new NewsApiSettings()), mockNewsRepository.Object);
            var expected = this.GetNews().Count;

            // Act
            var actual = service.GetAllNews().Count;

            //Assert
            Assert.Equal(expected, actual);
        }


        [Fact]
        public void AddNews_ShouldAddAsExpected()
        {
            // Arrange 
            var news = new News()
            {
                Id = 6,
                Description = "news desc 6"
            };
            mockNewsRepository.Setup(x => x.AddNews(It.IsAny<News>())).Returns(news);
            var service = new NewsService(Options.Create(new NewsApiSettings()), mockNewsRepository.Object);

            // Act
            var actual = service.AddNews(news);

            //Assert
            Assert.Equal(news, actual);
        }

        [Fact]
        public void Delete_ShouldNotThrowExforVaildId()
        {
            // Arrange
            this.mockNewsRepository.Setup(x => x.DeleteNews(It.IsAny<int>()));
            var service = new NewsService(Options.Create(new NewsApiSettings()), mockNewsRepository.Object);

            // Act
            Action actual = () => service.DeleteNews(1);
            var actualEx = Record.Exception(actual);

            // Assert
            Assert.Null(actualEx);
        }

        #endregion
        #region Negative Tests

        #endregion
        private List<News> GetNews()
        {
            List<News> lstNews = new List<News>();
            lstNews.Add(new News { Id = 1, Author = "ANI", Title = "news 1 title", Description = "news 1 description", PublishedAt = DateTime.Now, Url = "https://example.com/news1", UrlToImage = "https://example.com/news1image.jpg" });
            lstNews.Add(new News { Id = 2, Author = "TOI", Title = "news 2 title", Description = "news 2 description", PublishedAt = DateTime.Now, Url = "https://example.com/news2", UrlToImage = "https://example.com/news2image.jpg" });
            lstNews.Add(new News { Id = 3, Author = "TheHindu", Title = "news 3 title", Description = "news 3 description", PublishedAt = DateTime.Now, Url = "https://example.com/news3", UrlToImage = "https://example.com/news3image.jpg" });
            lstNews.Add(new News { Id = 4, Author = "MoneyControl", Title = "news 4 title", Description = "news 4 description", PublishedAt = DateTime.Now, Url = "https://example.com/news4", UrlToImage = "https://example.com/news4image.jpg" });
            return lstNews;
        }
    }
}
