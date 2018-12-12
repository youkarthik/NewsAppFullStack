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
            return _service.GetTopHeadlines();
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

        /// <summary>
        /// API method to get all news from favorites DB.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = _service.GetAllNews();
                return Ok(result);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
        /// <summary>
        /// Post method to add a new news
        /// </summary>
        /// <param name="news">News object</param>
        /// <returns>Status code based on the operation status</returns>
        [HttpPost]
        public IActionResult Post([FromBody] News news)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var result = _service.AddNews(news);
                return Created("/api/News", result);

            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status409Conflict, ex.Message);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Delete method to delete a news by its id from the collection
        /// </summary>
        /// <param name="id">news object key identifier</param>
        /// <returns>Status code based on the operation status</returns>
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _service.DeleteNews(id);
                return Ok();

            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}