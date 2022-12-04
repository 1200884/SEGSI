using System;
using System.Linq.Expressions;
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
            if (date.Equals(null)) throw new BusinessRuleValidationException("Date can't be null");
            if (date.CompareTo(DateTime.Now) < 0)
                throw new BusinessRuleValidationException("Date can't be in the past");
            this._Date = date;
        }
      
    }
}