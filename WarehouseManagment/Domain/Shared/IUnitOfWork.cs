using System.Threading.Tasks;

namespace WarehouseManagment.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}