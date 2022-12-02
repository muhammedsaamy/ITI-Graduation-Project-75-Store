using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Context;
using Store.Entities;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartSessionsController : ControllerBase
    {
        private readonly StoreContext _context;

        public CartSessionsController(StoreContext context)
        {
            _context = context;
        }

        // GET: api/CartSessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartSession>>> GetCartSessions()
        {
            return await _context.CartSessions.OrderBy(c => c.Created_At).ToListAsync();
        }

        // GET: api/CartSessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartSession>> GetCartSession(int id)
        {
            var cartSession = await _context.CartSessions.FindAsync(id);

            if (cartSession == null)
            {
                return NotFound();
            }

            return cartSession;
        }

        // GET: api/CartSessions
        [HttpGet("userOrders/{userid}")]
        public async Task<ActionResult<IEnumerable<CartSession>>> UserOrders(int userid)
        {
            return await _context.CartSessions.OrderBy(c => c.Created_At).Where(c=>c.UserId == userid).ToListAsync();
        }

        // PUT: api/CartSessions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartSession(int id, CartSession cartSession)
        {
            if (id != cartSession.Id)
            {
                return BadRequest();
            }

            _context.Entry(cartSession).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartSessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CartSessions
        [HttpPost]
        public async Task<ActionResult<CartSession>> PostCartSession( int userID)
        {
            var x = await _context.CartSessions.Where(c => c.UserId == userID && c.Ended_At.ToString() =="0001-01-01 00:00:00.0000000").ToListAsync();

            if (x.Count() > 0 )
            {
                return Ok("There are an Existing Cart");
            }
            else
            {

            CartSession cartSession = new CartSession()
            { 
                UserId = userID,
            };
            _context.CartSessions.Add(cartSession);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCartSession", new { id = cartSession.Id }, cartSession);
            }
        }

        // DELETE: api/CartSessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartSession(int id)
        {
            var cartSession = await _context.CartSessions.FindAsync(id);
            if (cartSession == null)
            {
                return NotFound();
            }

            _context.CartSessions.Remove(cartSession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartSessionExists(int id)
        {
            return _context.CartSessions.Any(e => e.Id == id);
        }
    }
}
