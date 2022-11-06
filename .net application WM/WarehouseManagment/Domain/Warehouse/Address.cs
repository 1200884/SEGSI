using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Warehouses
{   
public class Address : IValueObject
{
    public string Street { get; private set; }
    public string City { get; private set; }
    public string Country { get; private set; }

    public Address() { }

    public Address(string street, string city, string country)
    {
        this.Street = street;
        this.City = city;
        this.Country = country;
    }
}
}