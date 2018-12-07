using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        string _newsApiBaseUrl;
        string _miscParams;
        
        public NewsService(IOptions<NewsApiSettings> newsApiSettings)
        {
            _newsApiSettings = newsApiSettings;
            _newsApiBaseUrl = newsApiSettings.Value.NewsApiBaseUrl;
            var apiKey = newsApiSettings.Value.NewsApiKey;
            _miscParams = $"country=in&language=en&page=1&apikey={apiKey}";
        }

        public List<News> GetTopHeadlines(string categoryName = null)
        {
            
            var baseAddress = new Uri(_newsApiBaseUrl);
            string topHeadlinesUrl = $"top-headlines?{_miscParams}";

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
                    return news;
                }
            }
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
                    var news = JsonConvert.DeserializeObject<List<News>>(responseData);
                    return news;
                }
            }
        }
    }
}
