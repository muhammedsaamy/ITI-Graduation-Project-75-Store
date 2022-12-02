using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class CartSession 
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int ItemsCount { get; set; } = 0;
        public decimal? Total { get; set; }
        public string Statues { get; set; }
        public DateTime Created_At { get; set; }=DateTime.Now;
        public DateTime Ended_At { get; set; } 
        public CartSession()
        {
            CartItems = new HashSet<CartItem>();
        }

        public virtual ICollection<CartItem> CartItems { get; set; }
        public decimal? TotalDiscount { get;  set; }
        public decimal Amount { get;  set; }
    }
}
