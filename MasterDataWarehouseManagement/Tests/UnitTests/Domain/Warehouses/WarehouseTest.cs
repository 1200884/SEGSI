using System;
using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;
using Xunit;

namespace Tests.UnitTests.Domain.Warehouses{

<<<<<<< HEAD
public class WarehouseTest
{
    private readonly MDWM.Domain.Warehouses.Warehouse _warehouse = 
    new MDWM.Domain.Warehouses.Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,2,3);

    private readonly WarehouseService _warService = new WarehouseService( null ,null);


    [Fact(DisplayName = "Sucess")]
    public void WarehouseCreatedSuccessfully()
=======
    public class WarehouseTest
>>>>>>> 7c0413743252fe7dc451e08c72ea153169551139
    {

        [Fact(DisplayName = "Warehouse Created successfully")]
        public void WarehouseCreatedSuccessfully()
        {
            Assert.NotNull(new Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Id Cant Be Null")]
        public void WarehouseIdCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse(null, "descripitiontest","streettest","citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Id Cant Be Empty")]
        public void WarehouseIdCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("", "descripitiontest","streettest","citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Description Cant Be Null")]
        public void WarehouseDescriptionCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", null,"streettest","citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Description Cant Be Empty")]
        public void WarehouseDescriptionCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "","streettest","citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Description Cant Be Higher than 50 characters")]
        public void WarehouseDescriptionCantBeHigherThan50Characters()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "This is a very large description about an warehouse that leads to a business rule validation exception","streettest","citytest","countrytest",1,2,3));
        }
        
      /*  [Fact(DisplayName = "Warehouse Street Cant Be Null")]
        public void WarehouseStreetCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest",null,"citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Street Cant Be Empty")]
        public void WarehouseStreetCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","","citytest","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse City Cant Be Null")]
        public void WarehouseCityCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest",null,"countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse City Cant Be Empty")]
        public void WarehouseCityCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","","countrytest",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Country Cant Be Null")]
        public void WarehouseCountryCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","citytest",null,1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Country Cant Be Empty")]
        public void WarehouseCountryCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","citytest","",1,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Latitude Cant Be Lower Than 90")]
        public void WarehouseLatitudeCantBeLowerThan90()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",-91,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Latitude Cant Be Higher Than 90")]
        public void WarehouseLatitudeCantBeHigherThan90()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",91,2,3));
        }
        
        [Fact(DisplayName = "Warehouse Longitude Cant Be Lower Than 180")]
        public void WarehouseLongitudeCantBeLowerThan180()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,-182,3));
        }
        
        [Fact(DisplayName = "Warehouse Longitude Cant Be Higher Than 180")]
        public void WarehouseLongitudeCantBeHigherThan180()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,182,3));
        } */
    }
<<<<<<< HEAD

    [Theory]
    [InlineData("-1")]
    [InlineData("0")]
    [InlineData("123")]
    public void IsPrime_ValuesLessThan2_ReturnFalse(string value){
        var result = _warService.DeleteAsync(new WarehouseId(value));

        Assert.Null(result);
    }
    
}
=======
>>>>>>> 7c0413743252fe7dc451e08c72ea153169551139
}