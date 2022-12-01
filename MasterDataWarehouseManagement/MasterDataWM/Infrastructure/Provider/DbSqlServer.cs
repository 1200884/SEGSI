using MDWM.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MDWM.Infrastructure.Provider
{
    public class DbSqlServer : IDbProvider
    {
        public void AddDBContext(IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<MDWMDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()); 
        }
    }
}