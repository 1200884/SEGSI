using MDWM.Domain.Shared;
namespace MDWM.Domain.Warehouses
{   
public class Address : IValueObject
{
    public string Street { get; private set; }
    public string City { get; private set; }
    public string Country { get; private set; }

    public Address() { }

    public Address(string street, string city, string country)
    {
        if(string.IsNullOrEmpty(street))
            throw new BusinessRuleValidationException("Invalid Street");
        if (string.IsNullOrEmpty(city))
            throw new BusinessRuleValidationException("Invalid city");
        if (string.IsNullOrEmpty(country))
            throw new BusinessRuleValidationException("Invalid country");
        this.Street = street;
        this.City = city;
        this.Country = country;
    }
}
}