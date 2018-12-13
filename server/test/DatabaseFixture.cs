using Microsoft.EntityFrameworkCore;
using server.Db;
using server.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace test
{
    public class DatabaseFixture
    {
        private List<News> NewsList { get; set; }
        public INewsDbContext dbContext;

        public DatabaseFixture()
        {
            var options = new DbContextOptionsBuilder<NewsDbContext>()
                .UseInMemoryDatabase(databaseName: "NewsDB")
                .Options;

            dbContext = new NewsDbContext(options);

            dbContext.News.Add(new News { Id = 1, Author = "ANI", Title = "news 1 title",  Description = "news 1 description",  PublishedAt = DateTime.Now, Url = "https://example.com/news1", UrlToImage = "https://example.com/news1image.jpg" });
            dbContext.News.Add(new News { Id = 2, Author = "TOI", Title = "news 2 title",  Description = "news 2 description",  PublishedAt = DateTime.Now, Url = "https://example.com/news2", UrlToImage = "https://example.com/news2image.jpg" });
            dbContext.News.Add(new News { Id = 3, Author = "TheHindu", Title = "news 3 title", Description = "news 3 description",  PublishedAt = DateTime.Now, Url = "https://example.com/news3", UrlToImage = "https://example.com/news3image.jpg" });
            dbContext.News.Add(new News { Id = 4, Author = "MoneyControl", Title = "news 4 title",  Description = "news 4 description", PublishedAt = DateTime.Now, Url = "https://example.com/news4", UrlToImage = "https://example.com/news4image.jpg" });
            dbContext.SaveChanges();
        }

        public void Dispose()
        {
            NewsList = null;
            dbContext = null;
        }
    }
}
