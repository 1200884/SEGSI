using System;
using MDWM.Domain.Shared;
using MDWM.Domain.Deliveries;
using MDWM.Domain.Warehouses;
using Xunit;

namespace Tests.UnitTests.Domain.Deliveries{

    public class DeliveryTest
    {

        [Fact(DisplayName = "Delivery created without null")]
        public void DeliveryCreatedSuccessfully()
        {
            Assert.NotNull(new Delivery("idtest",new DateTime(2030,10,20),10,"waridtest",10,10));
        }
        
        [Fact(DisplayName = "Delivery id cant be null")]
        public void DeliveryIdCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( () =>
                new Delivery(null,new DateTime(2030,10,20),10,"waridtest",10,10));
        }
        
        [Fact(DisplayName = "Delivery id cant be empty")]
        public void DeliveryIdCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( () =>
                new Delivery("",new DateTime(2030,10,20),10,"waridtest",10,10));
        }

        /*[Fact(DisplayName = "Delivery date cant be lower than actual date")]
        public void DeliveryDateCantBeLowerThanActualDate()
        {
            Assert.Throws<BusinessRuleValidationException>( () =>
                new Delivery("idtest",new DateTime(2020,10,20),10,"waridtest",10,10));
        }
        
        [Fact(DisplayName = "Delivery weight cant be lower than 0")]
        public void DeliveryWeightCantBeLowerThan0()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new Delivery("idtest",new DateTime(2030,10,20),0,"waridtest",10,10));
        } */

        [Fact(DisplayName = "Delivery warehouse id cant be null")]
        public void DeliveryWarehouseIdCantBeNull()
        {
            Assert.Throws<BusinessRuleValidationException>( () =>
                new Delivery("idtest",new DateTime(2030,10,20),10,null,10,10));
        }
        
        [Fact(DisplayName = "Delivery warehouse id cant be empty")]
        public void DeliveryWarehouseIdCantBeEmpty()
        {
            Assert.Throws<BusinessRuleValidationException>( () =>
                new Delivery("idtest",new DateTime(2030,10,20),10,"",10,10));
        }

       /* [Fact(DisplayName = "Delivery load time cant be lower than 0")]
        public void DeliveryLoadTimeCantBeLowerThan0()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new Delivery("idtest",new DateTime(2030,10,20),10,"waridtest",0,10));
        }
        
        [Fact(DisplayName = "Delivery unload time cant be lower than 0")]
        public void DeliveryUnloadTimeCantBeLowerThan0()
        {
            Assert.Throws<BusinessRuleValidationException>(() =>
                new Delivery("idtest",new DateTime(2030,10,20),10,"waridtest",10,0));
        } */
        
    }
}