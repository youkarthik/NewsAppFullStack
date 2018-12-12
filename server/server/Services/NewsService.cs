using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.DataAccess;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace server.Services
{
    public class NewsService : INewsService
    {
        private readonly IOptions<NewsApiSettings> _newsApiSettings;
        private readonly INewsRepository _newsRepository;
        string _newsApiBaseUrl;
        string _miscParams;
        
        public NewsService(IOptions<NewsApiSettings> newsApiSettings, INewsRepository newsRespository)
        {
            _newsRepository = newsRespository;
            _newsApiSettings = newsApiSettings;
            _newsApiBaseUrl = newsApiSettings.Value.NewsApiBaseUrl;
            var apiKey = newsApiSettings.Value.NewsApiKey;
            _miscParams = $"language=en&page=1&apikey={apiKey}";
        }

        public List<News> GetTopHeadlines(string categoryName = null)
        {
            
            var baseAddress = new Uri(_newsApiBaseUrl);
            string topHeadlinesUrl = $"top-headlines?{_miscParams}&country=in";

            if (categoryName != null)
                topHeadlinesUrl += "&category=" + categoryName.Trim();
            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");

                using (var response = httpClient.GetAsync(topHeadlinesUrl))
                {
                    string responseData = response.Result.Content.ReadAsStringAsync().Result;
                    var jsonObj = JObject.Parse(responseData);
                    var news = jsonObj["articles"].ToObject<List<News>>();
                    UpdateIsFavorite(news);
                    return news;
                }
            }
        }

        private void UpdateIsFavorite(List<News> apiNews)
        {
            var dbNews = GetAllNews();

            apiNews.ForEach(x =>
            {
                var dbRecord = dbNews.Where(y => y.Title == x.Title).FirstOrDefault();
                if (dbRecord != null)
                {
                    x.IsFavorite = true;
                    x.Id = dbRecord.Id;
                }
            });
        }

        public List<News> GetNewsBySearch(string searchQuery)
        {

            var baseAddress = new Uri(_newsApiBaseUrl);
            string searchNewsUrl = $"everything?{_miscParams}";

            if (!string.IsNullOrEmpty(searchQuery))
                searchNewsUrl += "&q=" + searchQuery.Trim();

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("accept", "application/json");

                using (var response = httpClient.GetAsync(searchNewsUrl))
                {
                    string responseData = response.Result.Content.ReadAsStringAsync().Result;
                    var jsonObj = JObject.Parse(responseData);
                    var news = jsonObj["articles"].ToObject<List<News>>();
                    UpdateIsFavorite(news);
                    return news;
                }
            }
        }

        /// <summary>
        /// method to add news to the news db collection
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        public News AddNews(News news)
        {
            return _newsRepository.AddNews(news);
        }

        /// <summary>
        /// Method to delete a news by its id
        /// </summary>
        /// <param name="id">News object key identifier</param>
        public void DeleteNews(int id)
        {
            _newsRepository.DeleteNews(id);
        }

        /// <summary>
        /// Method to get all news collection from db
        /// </summary>
        /// <returns></returns> 
        public List<News> GetAllNews()
        {
            var news = _newsRepository.GetAllNews();
            news.ForEach(x => x.IsFavorite = true);
            return news;
        }

    }
}
