using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class FeedBack
    {
        [Key]
        public int Id { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual Product Product { get; set; }
        public int ProductId { get; set; }
        public string Comment { get; set; }
        [Range(1,5)]
        public int Rate { get; set; }
    }
}
