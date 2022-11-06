using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Warehouses
{
    public class Warehouse : Entity<WarehouseId>, IAggregateRoot
    {
     
        public string Description { get;  private set; }

        public Address address { get; private set;}

        public Coordinates coordinates { get; private set;}

        public bool Active{ get;  private set; }

        private Warehouse()
        {
            this.Active = true;
        }

        public Warehouse(string code, string description, string latitude, string longitude,string street, string city, string country)
        {
            this.Id = new WarehouseId(code);
            this.Description = description;
            this.address=new Address(street,city,country);
            this.coordinates=new Coordinates(latitude,longitude);
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive Warehouse.");
            this.Description = description;
        }

        public void ChangeAddress(string street, string city, string country)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive Warehouse.");
            this.address = new Address(street,city,country);
        }

        public void ChangeCoordinates(string latitude, string longitude)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive Warehouse.");
            this.coordinates = new Coordinates(latitude,latitude);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }
        
    }
}