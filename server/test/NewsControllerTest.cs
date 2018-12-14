using Microsoft.AspNetCore.Mvc;
using Moq;
using server.Controllers;
using server.Models;
using server.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace test
{
    public class NewsControllerTest
    {
        #region Positive test cases

        [Fact]
        public void GetAllNews_ShouldReturnListOfNews()
        {
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(service => service.GetAllNews()).Returns(GetNews());
            var newsController = new NewsController(mockINewsService.Object);

            // Act
            var result = newsController.Get();
            var actualResult = result as OkObjectResult;
            //Assert
            Assert.NotNull(result);
            Assert.Equal(200, actualResult.StatusCode);
        }

        [Fact]
        public void GetTopHeadlineNews_ShouldReturnListOfNews()
        {
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(service => service.GetTopHeadlines(null)).Returns(GetNews());
            var newsController = new NewsController(mockINewsService.Object);

            // Act
            var result = newsController.GetTopHeadLines();
            //Assert
            Assert.Equal(4, result.Count);
            Assert.NotNull(result);
        }



        [Fact]
        public void GetTopHeadlinesByCategory_ShouldReturnListOfNews()
        {
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(service => service.GetTopHeadlines("Technology")).Returns(GetNews());
            var newsController = new NewsController(mockINewsService.Object);

            // Act
            var result = newsController.GetTopHeadlines("Technology");
            //Assert
            Assert.Equal(4, result.Count);
            Assert.NotNull(result);
        }

        [Fact]
        public void GetSearchNews_ShouldReturnListOfNews()
        {
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(service => service.GetNewsBySearch("Chennai")).Returns(GetNews());
            var newsController = new NewsController(mockINewsService.Object);

            // Act
            var result = newsController.SearchNews("Chennai") as List<News>;
            //Assert
            Assert.Equal(4, result.Count);
            Assert.NotNull(result);
        }

        [Fact]
        public void AddNews_ShouldReturnCreatedStatusCode()
        {
            var news = new News { Id = 5, Author = "ANI", Title = "News 5 Title", Description = "desc" };
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(service => service.AddNews(news)).Returns(news);

            var controller = new NewsController(mockINewsService.Object);

            // Act
            var result = controller.Post(news);

            //Assert
            var resp = Assert.IsType<CreatedResult>(result);
            Assert.IsAssignableFrom<News>(resp.Value);
        }



        [Fact]
        public void DeleteNews_ShouldReturn_OkObjectResult_ForValidId()
        {
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(service => service.DeleteNews(3));

            var newsController = new NewsController(mockINewsService.Object);

            // Act
            var actual = newsController.Delete(3);


            //Assert
            Assert.IsType<OkResult>(actual);

        }
        #endregion
        #region Negative test cases


        [Fact]
        public void DeleteNews_ShouldReturn_NotFoundResult_ForInValidId()
        {
            var mockINewsService = new Mock<INewsService>();
            mockINewsService.Setup(x => x.DeleteNews(It.IsAny<int>())).Throws<ArgumentException>();
            var newsController = new NewsController(mockINewsService.Object);
            // Act
            var actual = newsController.Delete(6);

            //Assert
            var result = Assert.IsType<NotFoundObjectResult>(actual);

        }


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
