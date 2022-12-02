using System.ComponentModel.DataAnnotations;

namespace Store.Entities
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; }
        [Required, MaxLength(400)]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public int Stock { get; set; } = 0;
        public int? Weight { get; set; }
        public int? Size { get; set; }
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? Date_First_Available { get; set; }
        [Range(0, 100)]
        public int? Discount { get; set; }
        public virtual Brand Brand { get; set; }
        public int? BrandId { get; set; }
        public virtual Category Category { get; set; }
        public int? CategoryId { get; set; }
        public virtual CartItem CartItem { get; set; }
        public Product()
        {
            //Feedbacks=new HashSet<FeedBack>();
            productImages = new HashSet<productImages>();
        }
        public virtual ICollection<FeedBack> Feedbacks{ get; set; }
        public virtual ICollection<productImages> productImages { get; set; }

    }
}
