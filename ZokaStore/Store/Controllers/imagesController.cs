using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Entities;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class imagesController : ControllerBase
    {
        [HttpPost]
        public ActionResult uploadImagesTest()
        {
            if (Request.ContentType is null || !Request.ContentType.Contains("multipart/form-data"))
            {
                return BadRequest(new { err = "Wrong content type" });
            }
            var fileFormClient = Request.Form.Files;
            if (!fileFormClient.Any())
            {
                return BadRequest(new { err = "no files found" });
            }

            var allowedExtentions = new string[] { ".png", ".svg", ".jpg", "jpeg" };

            string[] url = new string[fileFormClient.Count];

            for (var i = 0; i < fileFormClient.Count; i++)
            {
                var file = fileFormClient[i];

                if (!allowedExtentions.Any(ext => file.FileName.EndsWith(ext, StringComparison.InvariantCultureIgnoreCase)))
                {
                    return BadRequest(new { err = "not valid extention" });
                }
                if (file.Length > 2_000_000)
                {
                    return BadRequest(new { err = "max size is 2MB" });
                }
                if (file.Length <= 0)
                {
                    return BadRequest(new { err = "empty file" });
                }

                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                var fullFilePath = Directory.GetCurrentDirectory() + @"\Assets\Images\" + fileName;

                using (var stream = new FileStream(fullFilePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }


                url[i] = $"{Request.Scheme}://{Request.Host}/Assets/Images/{fileName}";
            }
            return Ok(new { _url = url });

        }
    }
}
