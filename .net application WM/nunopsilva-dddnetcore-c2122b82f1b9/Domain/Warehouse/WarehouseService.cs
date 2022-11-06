using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IWarehouseRepository _repo;

         public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

         public async Task<List<WarehouseDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto{Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude});

            return listDto;
        }

        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);
            
            if(war == null)
                return null;

            return new WarehouseDto{Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude};
        }

        public async Task<WarehouseDto> AddAsync(WarehouseDto dto)
        {
            var war = new Warehouse(dto.Id, dto.Description,dto.Latitude, dto.Longitude, dto.Street, dto.City, dto.Country);

            await this._repo.AddAsync(war);

            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude};
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var war = await this._repo.GetByIdAsync(new WarehouseId(dto.Id)); 

            if (war == null)
                return null;   

            // change all field
            war.ChangeDescription(dto.Description);
            war.ChangeAddress(war.address.Street , war.address.City, war.address.Country);
            war.ChangeCoordinates(war.coordinates.Latitude, war.coordinates.Longitude);
            
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude};
        }

        public async Task<WarehouseDto> InactivateAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id); 

            if (war == null)
                return null;   

            // change all fields
            war.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude };
        }

         public async Task<WarehouseDto> DeleteAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id); 

            if (war == null)
                return null;   

            if (war.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active family.");
            
            this._repo.Remove(war);
            await this._unitOfWork.CommitAsync();

            return new WarehouseDto { Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude};
        }
        
    }
}    