using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public interface INewsService
    {
        List<News> GetTopHeadlines(string categoryName = null);
        List<News> GetNewsBySearch(string searchQuery);
    }
}
