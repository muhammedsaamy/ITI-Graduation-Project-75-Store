using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    [ComplexType]
    [Owned]
    public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public string StateOrProvince { get; set; }
        public string Country { get; set; }
    }
}
