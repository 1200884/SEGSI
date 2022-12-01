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
        if(latitude>=-90 && latitude <=90 && longitude>=-180 && longitude<=180){
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Altitude=altitude;
        }else{
            throw new BusinessRuleValidationException("Invalid Coordinates");
        }
    }
}
}