using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Entities;
using Store.Context;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        StoreContext db;
        public ProductController(StoreContext _db)
        {
            this.db = _db;
        }

        [HttpGet]   
        public async Task<ActionResult<IEnumerable<Product>>> Getallproducts()
        {
            return await db.Products.ToListAsync();
        }



        
            [HttpPost]
            public async Task<ActionResult<Product>> PostProduct(Product product)
            {

                db.Products.Add(product);
                await db.SaveChangesAsync();

                return CreatedAtAction("GetproductById", new { id = product.ProductId }, product);
            }
        

        [HttpDelete("{_id}")]
        public async Task<IActionResult> Deleteproduct(int _id)
        {
            Product s = db.Products.FirstOrDefault(c => c.ProductId == _id);
            if (s == null) return NotFound();
            else
            {
                await db.Products.FindAsync(_id);
                 db.Products.Remove(s);
                try
                {
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch
                {
                    return NotFound();
                }
            }
        }

        [HttpPut("{_id}")]

        public async Task<ActionResult<Product>> Editproduct(Product c, int _id)
        {
            if (c == null) return BadRequest();
            //Product _product =await  db.Products.FindAsync(_id);
            db.Entry(c).State = EntityState.Modified;

            List<productImages> images = c.productImages.ToList();
            foreach (productImages image in images)
            {
                db.Entry(image).State = EntityState.Modified;
            }


            if (ModelState.IsValid)
            {
                try { 
                await db.SaveChangesAsync();
                return Ok(c);
                }
                catch 
                {
                    return NotFound();

                }


            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetproductById(int id)
        {
            Product c = await db.Products.FindAsync(id);
            if (c == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(c);
            }
        }


        //getting all product categorey
        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<Category>>> GetallproductsCategorey()
        {
            //db.NewCourses.Count() == 0
            if (!db.Products.Any())
            {
                return NoContent();
            }
            else
            {
                return  await db.Categories.ToListAsync();
            }
        }

        //getting all product categorey
        [HttpGet("brand")]
        public async Task<ActionResult<IEnumerable<Brand>>> GetallproductsBrand()
        {
            
            return await db.Brands.ToListAsync();
            
        }
    }
}
