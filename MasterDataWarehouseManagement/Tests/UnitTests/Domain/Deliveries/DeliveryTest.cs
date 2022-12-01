using System;
using MDWM.Domain.Shared;
using MDWM.Domain.Deliveries;
using Xunit;

namespace Tests.UnitTests.Domain.Deliveries{

public class DeliveryTest
{
    private readonly MDWM.Domain.Warehouses.Warehouse _warehouse = 
    new MDWM.Domain.Warehouses.Warehouse("waridtest", "descripitiontest","streettest","citytest","countrytest",1,2,3);
    private readonly MDWM.Domain.Deliveries.Delivery _delivery = 
    new MDWM.Domain.Deliveries.Delivery("idtest","datetest",1,"waridtest",10,10);

    [Fact(DisplayName = "Sucess")]
    public void DeliveryCreatedSuccessfully()
    {
        Assert.NotNull(new MDWM.Domain.Deliveries.Delivery("idtest","datetest",1,"waridtest",10,10));
    }
    
}
}