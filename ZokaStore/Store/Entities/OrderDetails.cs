namespace Store.Entities
{
    public class OrderDetails
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
