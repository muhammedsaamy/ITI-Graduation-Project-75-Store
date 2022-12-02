using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Context;
using Store.Entities;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<CartItem>>> getCartItems(int id)
        {
            //&& c.Ended_At == null
            CartSession userCart = await _context.CartSessions
                .Where(c => c.UserId == id)
                .OrderByDescending(c => c.Id)
                .FirstOrDefaultAsync();


            if (userCart == null)
            {
                return NoContent();
            }

            List<CartItem> cartItems = await _context.CartItems
                .Where(c => c.CartSessionId == userCart.Id)
                .Include(c=>c.Product)
                .ToListAsync();

            decimal amount = 0;
            decimal? CartDiscount = 0;
            int NumberOfItems = 0;

            foreach (CartItem item in cartItems)
            {
                item.UnitPrice = item.Product.Price;
                item.Discount = item.Product.Discount;
                item._DiscountAmount = ((item.UnitPrice * item.Discount) / 100)*item.Quantity;
                item.Total = (item.UnitPrice * item.Quantity) - item._DiscountAmount;



                CartDiscount += item._DiscountAmount;
                amount += item.UnitPrice * item.Quantity;
                NumberOfItems++;

                //if (userCart.TotalDiscount == null)
                //    userCart.TotalDiscount = item._DiscountAmount;
                //else
                //    userCart.TotalDiscount = amount - CartDiscount;
                _context.Entry(item).State = EntityState.Modified;
            }

            userCart.ItemsCount = NumberOfItems;
            userCart.Amount = amount;
            userCart.TotalDiscount = CartDiscount;
            userCart.Total = userCart.Amount - userCart.TotalDiscount;
            await _context.SaveChangesAsync();
            _context.Entry(userCart).State = EntityState.Modified;

            return Ok(cartItems);

        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<CartSession>> getCartItemsByUserId(int id)
        {
            //&& c.Ended_At == null
            CartSession userCart = await _context.CartSessions
                .Where(c => c.UserId == id)
                .OrderByDescending(c => c.Id)
                .FirstOrDefaultAsync();

            return Ok(userCart);
        }


        [HttpGet("{prodId}/{CartId}")]
        
        public async Task<IActionResult> AddToCart(int prodId ,int  CartId)
        {
            var product = await _context.Products.FindAsync(prodId);
            //var cart = await _context.CartSessions.FindAsync(CartId);

            var item = new CartItem {
                CartSessionId = CartId,
                ProductId = prodId,
                Quantity = 1,
                UnitPrice = product.Price,
                Discount = product.Discount,
                 _DiscountAmount = (product.Price * product.Discount / 100)
            };


            //await updateTotal(item);

            _context.Entry(item).State = EntityState.Modified;
             _context.CartItems.Add(item);
            await _context.SaveChangesAsync();



            return Ok(item);
        }
        

        [HttpGet("Increase/{cartItemId}")]
        public async Task<ActionResult> Increase(int cartItemId)
        {
            var item = await _context.CartItems.FindAsync(cartItemId);
            item.Quantity++;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            await updateTotal(item);


            return NoContent();

        }

        [HttpGet("Decrease/{cartItemId}")]
        public async Task<ActionResult> Decrease(int cartItemId)
        {
            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if(cartItem.Quantity <= 1)
            {
                return BadRequest();
            }
            cartItem.Quantity--;
            _context.Entry(cartItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();


            await updateTotal(cartItem);


            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }
            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            await updateTotal(cartItem);

            return NoContent();
        }

        
        private async Task updateTotal(CartItem item)
        {
            var cart =await _context.CartSessions.FindAsync(item.CartSessionId);
            var ss = await _context.CartItems.Where(x => x.CartSessionId == item.CartSessionId).ToListAsync();

            decimal amount = 0;
            decimal? discount = 0;
            decimal? totalCheck = 0;

           

            foreach (var ssItem in ss)
            {
                ssItem.Total = (item.UnitPrice * item.Quantity) - item._DiscountAmount;

                amount += (ssItem.UnitPrice * ssItem.Quantity);
                discount += ssItem._DiscountAmount;
                totalCheck = amount-discount;
            }
            cart.ItemsCount = ss.Count();
            cart.TotalDiscount = discount;
            cart.Total = totalCheck - discount;
            cart.Amount=amount;

            if (item.Discount > 0)
            {
                var totalPrice = item.Quantity * item.UnitPrice;
                decimal? Discount = (item.Discount) / (100m);
                var totalDisccount = totalPrice * Discount;
                var total = totalPrice - totalDisccount;

                item.Total = total;
                item._DiscountAmount = totalDisccount;

            }
            else
            {
                item.Total = item.Quantity * item.UnitPrice;
            }

            _context.Entry(cart).State = EntityState.Modified;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
