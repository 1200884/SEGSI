using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;
using Xunit;

namespace Tests.UnitTests.Domain.Warehouses
{
    public class CoordinatesTest
    {
        [Fact(DisplayName = "Coordinates Created successfully")]
        public void CoordinatesCreatedSuccessfully()
        {
            Assert.NotNull(new Coordinates(1,2,3));
        }
        
        [Fact(DisplayName = "Latitude Cant Be Lower Than 90")]
        public void LatitudeCantBeLowerThan90()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Coordinates(-91,2,3));
        }
        
        [Fact(DisplayName = " Latitude Cant Be Higher Than 90")]
        public void LatitudeCantBeHigherThan90()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Coordinates(91,2,3));
        }
        
        [Fact(DisplayName = " Longitude Cant Be Lower Than 180")]
        public void LongitudeCantBeLowerThan180()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Coordinates(1,-182,3));
        }
        
        [Fact(DisplayName = "Longitude Cant Be Higher Than 180")]
        public void LongitudeCantBeHigherThan180()
        {
            Assert.Throws<BusinessRuleValidationException>( ()=>
                new Coordinates(1,182,3));
        }
    }
}