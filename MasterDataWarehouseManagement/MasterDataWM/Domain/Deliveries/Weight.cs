using MDWM.Domain.Shared;

namespace MDWM.Domain.Deliveries
{
    public class Weight : IValueObject
    {
        public double _Weight { get; private set; }
        
        private Weight(){}

        public Weight(double weight)
        {
            if (weight <= 0) 
                throw new BusinessRuleValidationException("Weight must be higher than 0");
            this._Weight = weight;
        }
    }
}