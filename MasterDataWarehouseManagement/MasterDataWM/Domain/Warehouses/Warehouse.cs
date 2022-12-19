using MDWM.Domain.Shared;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace MDWM.Domain.Warehouses
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

        public Warehouse(string code, string description, string street, string city, string country, double latitude, double longitude,double altitude)
        {
            if (string.IsNullOrEmpty(code))
                throw new BusinessRuleValidationException("Every warehouse requires an id.");
            if (string.IsNullOrEmpty(description)) 
                throw new BusinessRuleValidationException("Every warehouse requires a description");
            if (description.Length > 50)
                throw new BusinessRuleValidationException("Description can't be longer than 50");
            this.Id = new WarehouseId(code);
            this.Description = description;
            this.address=new Address(street,city,country);
            this.coordinates=new Coordinates(latitude,longitude,altitude);
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive warehouse.");
            this.Description = description;
        }

        public void ChangeAddress(string street, string city, string country)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the address to an inactive warehouse.");
            this.address = new Address(street,city,country);
        }

        public void ChangeCoordinates(double latitude, double longitude,double altitude)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the coordinates to an inactive warehouse.");
            this.coordinates = new Coordinates(latitude,longitude,altitude);
        }
        public void MarkAsInative()
        {
            this.Active = false;
        }

        public void MarkAsAtive()
        {
            this.Active = true;
        }

    }
}