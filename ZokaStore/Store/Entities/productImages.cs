using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Entities
{
    public class productImages
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Url { get; set; }

        [ForeignKey("ProductFK")]
        public virtual Product product { get; set; }
        public int ProductFK { get; set; }

    }
}
