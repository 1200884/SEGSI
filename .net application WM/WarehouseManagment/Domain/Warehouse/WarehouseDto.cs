using System;


namespace DDDSample1.Domain.Warehouses
{
    public class WarehouseDto
    {
        public String Id { get; set; }

        public string Description { get; set; }

        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

         public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

}