using System;


namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public String Id { get; set; }

        public string Description { get; set; }

        public Address address { get; set;}

        public Coordinates coordinates { get; set;}
    }
}