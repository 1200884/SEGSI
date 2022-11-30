using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MDWM.Infrastructure.Provider
{
    public interface IDbProvider
    {
        void AddDBContext(IServiceCollection service, IConfiguration configuration);
    }
}