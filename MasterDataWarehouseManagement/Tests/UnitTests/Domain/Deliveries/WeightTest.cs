using System;
using MDWM.Domain.Deliveries;
using MDWM.Domain.Shared;
using Xunit;

namespace Tests.UnitTests.Domain.Deliveries
{
    public class WeightTest
    {
        [Fact(DisplayName = "Weight created successfully")]
        public void WeightCreatedSuccessfully()
        {
            Assert.NotNull(new Weight(10));
        }
        
        [Fact(DisplayName = "Weight cant be lower than 0")]
        public void WeightCantBeLowerThan0()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new Weight(-10));
        }
    }
}