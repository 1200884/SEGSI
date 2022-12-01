using System;
using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;
using Xunit;

namespace Tests.UnitTests.Domain.Warehouses{

public class WarehouseTest
{
    private readonly MDWM.Domain.Warehouses.Warehouse _warehouse = 
    new MDWM.Domain.Warehouses.Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,2,3);

    [Fact(DisplayName = "Sucess")]
    public void WarehouseCreatedSuccessfully()
    {
        Assert.NotNull(new MDWM.Domain.Warehouses.Warehouse("idtest", "descripitiontest","streettest","citytest","countrytest",1,2,3));
    }
    
}
}