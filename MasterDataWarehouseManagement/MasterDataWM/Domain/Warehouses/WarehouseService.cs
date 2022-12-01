using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MDWM.Domain.Shared;

namespace MDWM.Domain.Warehouses
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
            
            List<WarehouseDto> listDto = list.ConvertAll<WarehouseDto>(war => new WarehouseDto{Id = war.Id.AsString(), Description = war.Description, Street = war.address.Street , City= war.address.City, Country=war.address.Country, Latitude=war.coordinates.Latitude, Longitude=war.coordinates.Longitude, Altitude=war.coordinates.Altitude});

            return listDto;
        }

        public async Task<WarehouseDto> GetByIdAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id);
            
            if(war == null)
                return null;

            return WarehouseMapper.ToDTO(war);
        }

        public async Task<WarehouseDto> AddAsync(WarehouseDto dto)
        {
            var war = WarehouseMapper.ToWarehouse(dto);

            await this._repo.AddAsync(war);

            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDTO(war);        
        }

        public async Task<WarehouseDto> UpdateAsync(WarehouseDto dto)
        {
            var war = await this._repo.GetByIdAsync(new WarehouseId(dto.Id)); 

            if (war == null)
                return null;   

            // change all field
            war.ChangeDescription(dto.Description);
            war.ChangeAddress(dto.Street , dto.City, dto.Country);
            war.ChangeCoordinates(dto.Latitude, dto.Longitude,dto.Altitude);
            
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDTO(war);        
            }

        public async Task<WarehouseDto> InactivateAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id); 

            if (war == null)
                return null;   

            // change all fields
            war.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDTO(war);        
        }

         public async Task<WarehouseDto> DeleteAsync(WarehouseId id)
        {
            var war = await this._repo.GetByIdAsync(id); 

            if (war == null)
                return null;   

            if (war.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active warehouse.");
            
            this._repo.Remove(war);
            await this._unitOfWork.CommitAsync();

            return WarehouseMapper.ToDTO(war);        
        }

    }
}    