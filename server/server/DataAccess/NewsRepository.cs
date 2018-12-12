using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Db;
using server.Models;

namespace server.DataAccess
{
    public class NewsRepository : INewsRepository
    {
        private readonly INewsDbContext _context;

        /// <summary>
        /// News Repository constuctor to inject News db context
        /// </summary>
        /// <param name="context">News db context</param>
        public NewsRepository(INewsDbContext context)
        {
            _context = context;
        }

        public News AddNews(News news)
        {
            var newsExists = _context.News.Any(e => e.Title == news.Title);
            if (!newsExists)
            {
                _context.News.Add(news);
                _context.SaveChanges();
                return news;
            }
            else
            {
                throw new ArgumentException("News with specified title already exists");
            }
        }

        public void DeleteNews(int id)
        {
            var news = _context.News.Where(x => x.Id == id).FirstOrDefault();

            if (news != null)
            {
                _context.News.Remove(news);
                _context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("News with specified id not found");
            }
        }

        public List<News> GetAllNews()
        {
            return _context.News.ToList();
        }
    }
}
