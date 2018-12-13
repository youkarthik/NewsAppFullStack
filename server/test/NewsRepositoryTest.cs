using server.DataAccess;
using server.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace test
{
    public class NewsRepositoryTest : IClassFixture<DatabaseFixture>
    {
        private readonly INewsRepository _repository;
        DatabaseFixture _databaseFixture;

        public NewsRepositoryTest(DatabaseFixture fixture)
        {
            _databaseFixture = fixture;
            _repository = new NewsRepository(_databaseFixture.dbContext);
        }

        #region Positive Tests


        [Fact]
        public void GetAllNews_ShouldReturnListofNews()
        {
            // Act
            var actual = this._repository.GetAllNews().Count;

            // Assert
            var expected = _databaseFixture.dbContext.News.Local.Count;
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void AddNews_ShouldReturnNews_onValidNews()
        {
            // Arrange 
            var newnews = new News()
            {
                Id = 5,
                Title = "Title5",
                Description = "Desc5"

            };

            // Act
            var actual = this._repository.AddNews(newnews);

            // Assert
            Assert.NotNull(actual);
            Assert.Same(newnews, actual);
        }
        [Fact]
        public void DeleteNews_ShouldNotThrowException_forVaildId()
        {
            //act
            Action actual = () => _repository.DeleteNews(4);
            var actualEx = Record.Exception(actual);

            // Assert
            Assert.Null(actualEx);
        }
        #endregion
        #region Negative Tests
        [Fact]
        public void AddNews_ShouldThrowException_forDuplicateTitle()
        {
            //arrange
            News newNews = new News { Title = "news 1 title" };
            //act
            Action act = () => _repository.AddNews(newNews);
            //assert
            Assert.Throws<ArgumentException>(act);
        }

        [Fact]
        public void DeleteNews_ShouldThrowException_forInVaildId()
        {
            //act
            Action actual = () => _repository.DeleteNews(6);
            var actualEx = Record.Exception(actual);

            // Assert
            Assert.NotNull(actualEx);
            Assert.Throws<ArgumentException>(actual);

        }

        #endregion
    }
}
