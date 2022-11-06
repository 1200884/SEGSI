using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Warehouses
{
public class Coordinates : IValueObject
{
    public double Latitude { get; private set; }
    public double Longitude { get; private set; }

    public Coordinates() { }
    public Coordinates(double latitude, double longitude)
    {
        if(latitude>=0 && latitude <=50 && longitude>=0 && longitude<=50){
        this.Latitude = latitude;
        this.Longitude = longitude;
        }else{
            throw new BusinessRuleValidationException("Invalid Coordinates");
        }
    }
}
}