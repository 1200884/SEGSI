using System.Threading.Tasks;

namespace MDWM.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}