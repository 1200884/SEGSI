using System;
using WarehouseManagment.Domain.Shared;
using Newtonsoft.Json;

namespace WarehouseManagment.Domain.Warehouses
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