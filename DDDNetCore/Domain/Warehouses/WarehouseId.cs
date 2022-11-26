using System;
using DDDNetCore.Domain.Shared;
using Newtonsoft.Json;

namespace DDDNetCore.Domain.Warehouses
{
    public class WarehouseId : EntityId
    {

        public WarehouseId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return text;
        }
        
       override
        public String AsString(){
            return (String) base.Value;
        }
    }
}