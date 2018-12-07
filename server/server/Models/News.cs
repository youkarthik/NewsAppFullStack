using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class News
    {
        [JsonProperty(PropertyName = "author")]
        public string Author { get; set; }
        [JsonProperty(PropertyName = "title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "url")]
        public string Url { get; set; }
        [JsonProperty(PropertyName = "urlToImage")]
        public string UrlToImage{ get; set; }
        [JsonProperty(PropertyName = "publishedAt")]
        public DateTime PublishedAt { get; set; }
        [JsonProperty(PropertyName = "category")]
        public string Category { get; set; }
    }
}
