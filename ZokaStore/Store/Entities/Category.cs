namespace Store.Entities
{
    public class Category : BaseClass
    {
        public string Name { get; set; }


        public Category()
        {
            Products = new HashSet<Product>();
        }
        public virtual ICollection<Product> Products { get; set; }
    }
}
