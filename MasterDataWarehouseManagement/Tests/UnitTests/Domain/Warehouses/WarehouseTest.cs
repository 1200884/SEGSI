using System;
using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;
using Xunit;

namespace Tests.UnitTests.Domain.Warehouses{

public class WarehouseTest
{
    private readonly MDWM.Domain.Warehouses.Warehouse _warehouse = 
    new MDWM.Domain.Warehouses.Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,2,3);

    private readonly WarehouseService _warService = new WarehouseService( null ,null);


    [Fact(DisplayName = "Sucess")]
    public void WarehouseCreatedSuccessfully()
    {
        Assert.NotNull(new MDWM.Domain.Warehouses.Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,2,3));
    }

    [Theory]
    [InlineData("-1")]
    [InlineData("0")]
    [InlineData("123")]
    public void IsPrime_ValuesLessThan2_ReturnFalse(string value){
        var result = _warService.DeleteAsync(new WarehouseId(value));

        Assert.Null(result);
    }
    
}
}