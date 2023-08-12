using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    //DbContext è una classe contenuta in EFC
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        //DbSets rappresentano le tabelle
        //Activities sarà il nome di una tabella nel DB
        public DbSet<Activity> Activities { get; set; }
    }
}