using System;
using MDWM.Domain.Deliveries;
using MDWM.Domain.Shared;
using Xunit;

namespace Tests.UnitTests.Domain.Deliveries
{
    public class PackagingTimeTest
    {
        [Fact(DisplayName = "Packaging time created successfully")]
        public void PackagingTimeCreatedSuccessfully()
        {
            Assert.NotNull(new PackagingTime(10, 10));
        }
        
        [Fact(DisplayName = "Load time cant be lower than 0")]
        public void LoadTimeCantBeLowerThan0()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new PackagingTime(-10,10));
        }
        
        [Fact(DisplayName = "Unload time cant be lower than 0")]
        public void UnloadTimeCantBeLowerThan0()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new PackagingTime(10,-10));
        }
    }
}