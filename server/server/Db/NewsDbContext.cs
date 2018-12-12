using Microsoft.EntityFrameworkCore;

using server.Models;

namespace server.Db
{
    public class NewsDbContext : DbContext, INewsDbContext
    {
        public NewsDbContext()
        {

        }

        /// <summary>
        /// News db context constructor, makes sure database is created
        /// </summary>
        /// <param name="options"></param>
        public NewsDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<News> News { get; set; }
    }
}
