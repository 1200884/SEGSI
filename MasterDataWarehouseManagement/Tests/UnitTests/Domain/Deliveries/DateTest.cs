using System;
using MDWM.Domain.Deliveries;
using MDWM.Domain.Shared;
using Xunit;

namespace Tests.UnitTests.Domain.Deliveries
{
    public class DateTest
    {

        [Fact(DisplayName = "Date successfully created")]
        public void DateSucessfullyCreated()
        {
            Assert.NotNull(new DateTime(2030,10,20));
        }
        
        
        [Fact(DisplayName = "Date cant be lower than actual date")]
        public void DateCantBeLowerThanActualDate()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new Date(new DateTime(2020, 10, 20)));
        }
        
    }
}