using System;
 
 namespace DDDNetCore.Domain.Warehouses
 {
    public class WarehouseMapper
    {
        public static WarehouseDto ToDTO(Warehouse war){
            return new WarehouseDto(){
                Id = war.Id.AsString(),
                Description = war.Description, 
                Street = war.address.Street , 
                City= war.address.City, 
                Country=war.address.Country, 
                Latitude=war.coordinates.Latitude, 
                Longitude=war.coordinates.Longitude,
                Altitude=war.coordinates.Altitude
            };
        }

        public static Warehouse ToWarehouse(WarehouseDto war){
            return new Warehouse(war.Id, war.Description, war.Street, war.City, war.Country, war.Latitude, war.Longitude,war.Altitude);
        }
    }
}    