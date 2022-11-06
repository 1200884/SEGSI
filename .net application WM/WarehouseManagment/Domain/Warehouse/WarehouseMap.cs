using System;
 
 namespace DDDSample1.Domain.Warehouses
 {
    public class WarehouseMap
    {
        public static WarehouseDto ToDTO(Warehouse war){
            return new WarehouseDto(){
                Id = war.Id.AsString(),
                Description = war.Description, 
                Street = war.address.Street , 
                City= war.address.City, 
                Country=war.address.Country, 
                Latitude=war.coordinates.Latitude, 
                Longitude=war.coordinates.Longitude
            };
        }

        public static Warehouse ToWarehouse(WarehouseDto war){
            return new Warehouse(war.Id,war.Description, war.Latitude, war.Longitude,war.Street , war.City, war.Country);
        }
    }
}    