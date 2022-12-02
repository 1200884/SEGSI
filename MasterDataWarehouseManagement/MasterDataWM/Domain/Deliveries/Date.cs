using System;
using MDWM.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace MDWM.Domain.Deliveries
{

    public class Date : IValueObject
    {
        public DateTime _Date { get; private set; }
        
        private Date(){}

        public Date(DateTime date)
        {
            if (date.Equals(null)) throw new BusinessRuleValidationException("Data can't be null");
            this._Date = date;

        }
      
    }
}