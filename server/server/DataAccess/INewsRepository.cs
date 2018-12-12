using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DataAccess
{
    public interface INewsRepository
    {
        List<News> GetAllNews();
        News AddNews(News news);
        void DeleteNews(int id);
    }
}
