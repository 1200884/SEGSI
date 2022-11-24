using System;
using DDDNetCore.Domain.Shared;

namespace DDDNetCore.Domain.Deliveries
{
    public class Delivery : Entity<DeliveryId>, IAggregateRoot 
    {

        public string date { get;  private set;}

        public int weight { get;  private set;}
                
        public string destinationWarhouseId  {get;  private set;}

        public int loadTime { get;  private set;}

        public int unloadTime { get;  private set;}

        public bool Active{ get;  private set; }
        
        private Delivery(){
            this.Active = true;
        }

        public Delivery(string Id, string date, int weight, string warId, int loadTime, int unloadTime)
        {
            this.Id = new DeliveryId(Id);
            this.date = date;
            if (checkWeight(weight))
                this.weight = weight;
            if (checkWarehouseDeliveryId(warId))
                this.destinationWarhouseId = warId;
            if (checkLoadTime(loadTime))
                this.loadTime = loadTime;
            if (checkUnloadTime(unloadTime))    
                this.unloadTime = unloadTime;
            this.Active = true;
        }

        public Boolean checkWeight (int weight){
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

        public void ChangeDate(string date)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the date to an inactive delivery.");
            if (date == null)
                throw new BusinessRuleValidationException("The date of a delivery can't be null");
                this.date=date;
        }

        public void ChangeWeight(int weight)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the weight to an inactive delivery.");
            if (checkWeight(weight))
                this.weight = weight;  
        }

        public void ChangeWarehouseDeliveryId(string warId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the delivery warehouse to an inactive delivery.");
            if (checkWarehouseDeliveryId(warId))
                this.destinationWarhouseId = warId;
        }

        public void ChangeLoadTime(int loadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the load time to an inactive delivery.");
            if (checkLoadTime(loadTime))
                this.loadTime = loadTime;
        }

        public void ChangeUnloadTime(int unloadTime)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the unload time to an inactive delivery.");
            if (checkUnloadTime(unloadTime))    
                this.unloadTime = unloadTime;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}