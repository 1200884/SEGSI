using System;
using MDWM.Domain.Shared;
using Newtonsoft.Json;

namespace MDWM.Domain.Warehouses
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