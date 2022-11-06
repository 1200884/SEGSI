using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Warehouses
{
public class Coordinates : IValueObject
{
    public string Latitude { get; private set; }
    public string Longitude { get; private set; }

    public Coordinates() { }
    public Coordinates(string latitude, string longitude)
    {
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
}
}