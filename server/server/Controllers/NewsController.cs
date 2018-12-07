using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Produces("application/json")]
    [Route("api/News")]
    public class NewsController : Controller
    {
        private readonly INewsService _service;

        public NewsController(INewsService service)
        {
            _service = service;
        }

        /// <summary>
        /// API method to get all top headlines news from NewsAPI service.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTopHeadLines")]

        public List<News> GetTopHeadLines()
        {
            return  _service.GetTopHeadlines();
        }

        /// <summary>
        /// API method to get top headlines new from NewsAPI service.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTopHeadlines/{categoryName}")]
        public List<News> GetTopHeadlines(string categoryName)
        {
            return _service.GetTopHeadlines(categoryName);
        }


        /// <summary>
        /// API method to get all news based on search query from NewsAPI service.
        /// </summary>
        /// <param name="searchText"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("SearchNews/{searchQuery}")]
        public List<News> SearchNews(string searchQuery)
        {
            return _service.GetNewsBySearch(searchQuery);
        }
    }
}