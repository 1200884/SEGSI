using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Warehouses;


namespace DDDSample1.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot
    {

        public string date { get;  private set;}

        public int weight { get;  private set;}
                
        public string warehouseDeliveryId  {get;  private set;}

        public int loadTime { get;  private set;}

        public int unloadTime { get;  private set;}

        public bool Active{ get;  private set; }
        
        private Delivery(){
            this.Active = true;
        }

        public Delivery(string Id, string date, int weight, string warId, int loadTime, int unloadTime)
        {
            if (warId == null)
                throw new BusinessRuleValidationException("Every delivery requires a warehouse.");
            this.Id = new DeliveryId(Id);
            this.date = date;
            this.weight = weight;
            this.warehouseDeliveryId = warId;
            this.loadTime = loadTime;
            this.unloadTime = unloadTime;
            this.Active = true;
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

        public void ChangeWarehouseDeliveryId(string warId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the delivery warehouse to an inactive Delivery.");
            if (warId == null)
                throw new BusinessRuleValidationException("Every product requires a category.");
            this.warehouseDeliveryId = warId;
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