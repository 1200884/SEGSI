using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;
using Xunit;

namespace Tests.UnitTests.Domain.Warehouses
{
    public class AddressTest
    {
        [Fact(DisplayName = "Warehouse Created successfully")]
        public void WarehouseCreatedSuccessfully()
        {
            Assert.NotNull(new Address("streettest","citytest","countrytest"));
        }
        
        [Fact(DisplayName = "Warehouse Street Cant Be Null")]
        public void WarehouseStreetCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Address(null,"citytest","countrytest"));
        }
        
        [Fact(DisplayName = "Warehouse Street Cant Be Empty")]
        public void WarehouseStreetCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Address("","citytest","countrytest"));
        }
        
        [Fact(DisplayName = "Warehouse City Cant Be Null")]
        public void WarehouseCityCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Address("streettest",null,"countrytest"));
        }
        
        [Fact(DisplayName = "Warehouse City Cant Be Empty")]
        public void WarehouseCityCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Address("streettest","","countrytest"));
        }
        
        [Fact(DisplayName = "Warehouse Country Cant Be Null")]
        public void WarehouseCountryCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Address("streettest","citytest",null));
        }
        
        [Fact(DisplayName = "Warehouse Country Cant Be Empty")]
        public void WarehouseCountryCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Address("streettest","citytest",""));
        }
    }
}