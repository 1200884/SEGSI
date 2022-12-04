using MDWM.Domain.Shared;
namespace MDWM.Domain.Warehouses
{
public class Coordinates : IValueObject
{
    public double Latitude { get; private set; }
    public double Longitude { get; private set; }
    public double Altitude { get; private set; }

    public Coordinates() { }
    public Coordinates(double latitude, double longitude, double altitude)
    {
        if(latitude is < -90 or > 90)
            throw new BusinessRuleValidationException("Invalid latitude");
        if (longitude is < -180 or > 180)
            throw new BusinessRuleValidationException("Invalid longitude");
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Altitude=altitude;
    }
    
}
}
