using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public int CartSessionId { get; set; }
        public virtual CartSession CartSession { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public int? Discount { get; set; }
        public decimal? _DiscountAmount { get; set; }
        public decimal? Total { get; set; }
    }
}
