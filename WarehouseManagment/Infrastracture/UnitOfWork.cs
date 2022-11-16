using System.Threading.Tasks;
using WarehouseManagment.Domain.Shared;

namespace WarehouseManagment.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WarehouseManagmentDbContext _context;

        public UnitOfWork(WarehouseManagmentDbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}