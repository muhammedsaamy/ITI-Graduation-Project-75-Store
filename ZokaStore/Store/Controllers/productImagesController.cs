using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Context;
using Store.Entities;

namespace testFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class productImagesController : ControllerBase
    {

        StoreContext db;
        public productImagesController(StoreContext _db)
        {
            this.db = _db;
        }
        [HttpPost]
        public IActionResult uploadProductImage(productImages pm)
        {
            if (pm == null) return BadRequest();
            if (ModelState.IsValid)
            {

                db.ProductImages.Add(pm);
                try
                {
                    db.SaveChanges();
                    return Created("seccess", db.ProductImages.ToList());
                }
                catch
                {
                    return BadRequest();
                }
            }
            else
                return BadRequest();

        }

        [HttpDelete("{_id}")]
        public async Task<IActionResult> DeleteImage(int _id)
        {
            productImages s = db.ProductImages.FirstOrDefault(c => c.Id == _id);
            if (s == null) return NotFound();
            else
            {
                await db.ProductImages.FindAsync(_id);
                db.ProductImages.Remove(s);
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

        [HttpGet("{id}")]
        public ActionResult GetImageById(int id)
        {
            List<productImages> c = db.ProductImages.Where(x => x.ProductFK == id).ToList();
            if (c == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(c);
            }
        }

    }
}
