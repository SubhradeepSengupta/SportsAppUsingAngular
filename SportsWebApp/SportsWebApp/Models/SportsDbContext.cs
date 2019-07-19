using Microsoft.EntityFrameworkCore;

namespace SportsWebApp.Models
{
    public class SportsDbContext : DbContext
    {
        public SportsDbContext(DbContextOptions<SportsDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestType> TestTypes { get; set; }
        public DbSet<TestTypeMapper> TestTypeMappers { get; set; }
        public DbSet<UserTestMapper> UserTestMappers { get; set; }
    }
}
