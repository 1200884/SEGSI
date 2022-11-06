using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;

namespace DDDSample1.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IDeliveryRepository _repo;

        private readonly IWarehouseRepository _repo2;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo, IWarehouseRepository repo2)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
            _repo2=repo2;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<DeliveryDto> listDto = list.ConvertAll<DeliveryDto>
            (del => new DeliveryDto{
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                warehouseDeliveryId = del.warehouseDeliveryId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime});

            return listDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var del = await this._repo.GetByIdAsync(id);
            
            if(del == null)
                return null;

            return new DeliveryDto{
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                warehouseDeliveryId = del.warehouseDeliveryId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime};
        }

        public async Task<DeliveryDto> AddAsync(DeliveryDto dto)
        {
            await checkWarehouseIdAsync(new WarehouseId(dto.warehouseDeliveryId));

            var del = new Delivery(dto.Id, dto.date, dto.weight, dto.warehouseDeliveryId, dto.loadTime, dto.unloadTime);

            await this._repo.AddAsync(del);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto{
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                warehouseDeliveryId = del.warehouseDeliveryId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime};
        }

        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            var del = await this._repo.GetByIdAsync(new DeliveryId(dto.Id)); 

            if (del == null)
                return null;   

            // change all field
            del.ChangeDate(dto.date);
            del.ChangeWeight(dto.weight);
            del.ChangeWarehouseDeliveryId(dto.warehouseDeliveryId);
            del.ChangeLoadTime(dto.loadTime);
            del.ChangeUnloadTime(dto.unloadTime);
            
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto{
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                warehouseDeliveryId = del.warehouseDeliveryId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime};
        }

        public async Task<DeliveryDto> InactivateAsync(DeliveryId id)
        {
            var del = await this._repo.GetByIdAsync(id); 

            if (del == null)
                return null;   

            // change all fields
            del.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto{
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                warehouseDeliveryId = del.warehouseDeliveryId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime};
        }

        public async Task<DeliveryDto> DeleteAsync(DeliveryId id)
        {
            var del = await this._repo.GetByIdAsync(id); 

            if (del == null)
                return null;   

            if (del.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active delivery.");
            
            this._repo.Remove(del);
            await this._unitOfWork.CommitAsync();

            return new DeliveryDto{
                Id = del.Id.AsString(),
                date = del.date, 
                weight = del.weight,
                warehouseDeliveryId = del.warehouseDeliveryId,
                loadTime = del.loadTime, 
                unloadTime = del.unloadTime};
        }    

        private async Task checkWarehouseIdAsync(WarehouseId warehouseId){
            var war = await _repo2.GetByIdAsync(warehouseId);
            if (war == null)
                throw new BusinessRuleValidationException("Invalid Warehouse Id.");
        }   
    }
}