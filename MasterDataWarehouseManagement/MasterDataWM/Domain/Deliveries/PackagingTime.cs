using MDWM.Domain.Shared;

namespace MDWM.Domain.Deliveries
{
    public class PackagingTime : IValueObject
    {
        public int _LoadTime { get; private set; }
        
        public int _UnloadTime { get; private set; }
        
        private PackagingTime(){}

        public PackagingTime(int loadTime, int unloadTime)
        {
            if (loadTime <= 0)
                throw new BusinessRuleValidationException("Load time must be higher than 0");
            if (unloadTime <= 0)
                throw new BusinessRuleValidationException("Unload time must be higher than 0");
            this._LoadTime = loadTime;
            this._UnloadTime = unloadTime;
        }
    }
}