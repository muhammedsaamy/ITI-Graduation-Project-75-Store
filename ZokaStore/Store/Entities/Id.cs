using Microsoft.AspNetCore.Identity;

namespace Store.Entities
{
    public class Id
    {
        public class CustomUserRole  : IdentityUserRole<int> { }
        public class CustomUserClaim : IdentityUserClaim<int> { }
        public class CustomUserLogin : IdentityUserLogin<int> { }
    }
}
