using DDDNetCore.Domain.Shared;
namespace DDDNetCore.Domain.Warehouses
{
public class Coordinates : IValueObject
{
    public double Latitude { get; private set; }
    public double Longitude { get; private set; }

    public Coordinates() { }
    public Coordinates(double latitude, double longitude)
    {
        if(latitude>=-90 && latitude <=90 && longitude>=-180 && longitude<=180){
        this.Latitude = latitude;
        this.Longitude = longitude;
        }else{
            throw new BusinessRuleValidationException("Invalid Coordinates");
        }
    }
}
}