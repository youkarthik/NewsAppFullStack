using Microsoft.EntityFrameworkCore;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Db
{
    public interface INewsDbContext
    {
        DbSet<News> News { get; set; }
        int SaveChanges();
    }
}
