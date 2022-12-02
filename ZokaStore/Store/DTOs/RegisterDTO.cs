using Store.Entities;

namespace Store.DTOs;

public class RegisterDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; } = "";
    public string Email { get; set; }
    public DateTime BirthDay { get; set; }
    public string Gender { get; set; }
    public string Phone { get; set; }
    public Address Address { get; set; }
    public string Street { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Password { get; set; } = "";
    public int Role { get; set; }  
}
