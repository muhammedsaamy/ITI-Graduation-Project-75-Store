using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using static Store.Entities.Id;

namespace Store.Entities
{
    public class User : IdentityUser<int>

    {

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTimeOffset BirthDay { get; set; }
        public int? Age { get { return DateTime.Now.Year - BirthDay.Year; } }
        [Required]
        public string Gender { get; set; }
        public int Role { get; set; }
        //[Required,EmailAddress]
        //public string Email { get; set; }
        //[Required]
        //public string UserName { get; set; }
        //[Required]
        //public string Password { get; set; }
        //[NotMapped , Required , Compare(nameof(Password))]
        //public string CPassword { get; set; }
        public virtual Address Address { get; set; }
        //public int? Phone { get; set; }
        public User()
        {
            CartSession = new HashSet<CartSession>();
        }
        public virtual IEnumerable<CartSession>  CartSession { get; set; }
    }
}
