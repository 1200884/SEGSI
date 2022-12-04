using System;
using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;

namespace MDWM.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot 
    {

        public Date date { get;  private set;}

        public Weight weight { get;  private set;}
                
        public WarehouseId destinationWarehouseId  {get;  private set;}

        public PackagingTime packagingTime { get;  private set;}

        public bool Active{ get;  private set; }
        
        private Delivery(){
            this.Active = true;
        }

        public Delivery(string Id, DateTime date, double weight, string destinationWarehouseId, int loadTime, int unloadTime)
        {
            if (string.IsNullOrEmpty(Id))
                throw new BusinessRuleValidationException("Every delivery requires an id.");
            if (string.IsNullOrEmpty(destinationWarehouseId))
                throw new BusinessRuleValidationException("Every delivery requires a delivery warehouse id.");
            this.Id = new DeliveryId(Id);
            this.date = new Date (date);
            this.weight = new Weight(weight);
            this.destinationWarehouseId = new WarehouseId(destinationWarehouseId);
            this.packagingTime=new PackagingTime(loadTime,unloadTime);
            this.Active = true;
        }
        
        public void ChangeDate(DateTime date)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive delivery.");
            this.date=new Date(date);
        }

        public void ChangeWeight(double weight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the weight to an inactive delivery.");
            this.weight = new Weight(weight);  
        }

        public void ChangeWarehouseDeliveryId(string destinationWarehouseId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the delivery warehouse to an inactive delivery.");
            this.destinationWarehouseId = new WarehouseId(destinationWarehouseId);
        }

        public void ChangePackagingTime(int loadTime, int unloadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the packaging time to an inactive delivery.");
            this.packagingTime = new PackagingTime(loadTime,unloadTime);
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}