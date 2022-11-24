using DDDNetCore.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DDDNetCore.Infrastructure.Provider
{
    public class DbInMemory : IDbProvider
    {
        public void AddDBContext(IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<DDDNetCoreDbContext>(opt =>
                opt.UseInMemoryDatabase("DDDNetCoreContext")
                    .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
        }
    }
}