using System;
using MDWM.Domain.Shared;

namespace MDWM.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot 
    {

        public Date date { get;  private set;}

        public Weight weight { get;  private set;}
                
        public string destinationWarehouseId  {get;  private set;}

        public PackagingTime packagingTime { get;  private set;}

        public bool Active{ get;  private set; }
        
        private Delivery(){
            this.Active = true;
        }

        public Delivery(string Id, DateTime date, double weight, string warId, int loadTime, int unloadTime)
        {
            this.Id = new DeliveryId(Id);
            this.date = new Date (date);
            if (checkWeight(weight))
                this.weight = new Weight(weight);
            if (checkWarehouseDeliveryId(warId))
                this.destinationWarehouseId = warId;
            if (checkLoadTime(loadTime))
                this.packagingTime=new PackagingTime(loadTime,unloadTime);
            this.Active = true;
        }

        public Boolean checkWeight (double weight){
            if (weight < 0)
                throw new BusinessRuleValidationException("The weigth of a delivery can't be negative.");
            return true;    
        }

        public Boolean checkWarehouseDeliveryId (string warId){
            if (warId == null)
                throw new BusinessRuleValidationException("Every delivery requires a warehouse where to deliver.");
            return true;    
        }

        public Boolean checkLoadTime (int loadTime){
            if (loadTime < 0)
                throw new BusinessRuleValidationException("The load Time of a delivery can't be negative.");
            return true;    
        }
        public Boolean checkUnloadTime (int unloadTime){
            if (unloadTime < 0)
                throw new BusinessRuleValidationException("The unload Time of a delivery can't be negative.");
            return true;    
        }

        public void ChangeDate(DateTime date)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive delivery.");
            if (date == null)
                throw new BusinessRuleValidationException("The date of a delivery can't be null");
                this.date=new Date(date);
        }

        public void ChangeWeight(double weight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the weight to an inactive delivery.");
            if (checkWeight(weight))
                this.weight = new Weight(weight);  
        }

        public void ChangeWarehouseDeliveryId(string warId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the delivery warehouse to an inactive delivery.");
            if (checkWarehouseDeliveryId(warId))
                this.destinationWarehouseId = warId;
        }

        public void ChangeLoadTime(int loadTime, int unloadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the load time to an inactive delivery.");
            this.packagingTime = new PackagingTime(loadTime,unloadTime);
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}