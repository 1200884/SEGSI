using System.Threading.Tasks;
using MDWM.Domain.Shared;

namespace MDWM.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MDWMDbContext _context;

        public UnitOfWork(MDWMDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}