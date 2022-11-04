using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;


namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {

        public string date { get;  private set;}

        public int weight { get;  private set;}
                
        public WarehouseId warehouseDeliveryId  {get;  private set;}

        public int loadTime { get;  private set;}

        public int unloadTime { get;  private set;}

        public bool Active{ get;  private set; }
        
        private Delivery(){
            this.Active = true;
        }

        public Delivery(string id, string date, int weight, string warehouseDeliveryId, int loadTime, int unloadTime)
        {

            this.Id = new DeliveryId(id);
            this.date = date;
            this.weight = weight;
            this.warehouseDeliveryId = new WarehouseId(warehouseDeliveryId);
            this.loadTime = loadTime;
            this.unloadTime = unloadTime;
            this.Active = Active;
        }

        public void ChangeDate(string date)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive Delivery.");
            this.date = date;
        }

        public void ChangeWeight(int weight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the weight to an inactive Delivery.");
            this.weight = weight;
        }

        public void ChangeWarehouseDeliveryId(string warehouseDeliveryId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the delivery warehouse to an inactive Delivery.");
            this.warehouseDeliveryId = new WarehouseId(warehouseDeliveryId);
        }

        public void ChangeLoadTime(int loadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the load time to an inactive Delivery.");
            this.loadTime = loadTime;
        }

        public void ChangeUnloadTime(int unloadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the unload time to an inactive Delivery.");
            this.unloadTime = unloadTime;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}