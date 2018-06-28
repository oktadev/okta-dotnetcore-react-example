using Microsoft.EntityFrameworkCore;
using okta_dotnetcore_react_example.Models;

namespace okta_dotnetcore_react_example.Data
{
  public class ApiContext : DbContext
  {
    public ApiContext(DbContextOptions<ApiContext> options)
  : base(options)
    { }

    public DbSet<Session> Sessions { get; set; }
  }
}