using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Store.Context;
using Store.DTOs;
using Store.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly StoreContext _context;

        public AdminController(IConfiguration configuration, UserManager<User> userManager
            , StoreContext context)
        {
            _configuration = configuration;
            _userManager = userManager;
            _context = context;
        }


        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new   User()
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                UserName = registerDTO.Username,
                Email = registerDTO.Email,
                Gender = registerDTO.Gender,
                Address = registerDTO.Address,
                BirthDay = registerDTO.BirthDay,
                PhoneNumber = registerDTO.Phone

            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddClaimsAsync(user, new List<Claim>
            {
                //to string xxx
                new Claim("id" , user.Id.ToString()),
                

            });
          
            return StatusCode(StatusCodes.Status201Created);
        }



        [HttpPost]
        [Route("ForgetPassword")]
        public async Task<ActionResult> ForgetPassword(string newPAss, string oldPass)
        {
            //How to Get Current User
            var cuurentUserId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var currentUser = await _userManager.FindByIdAsync(cuurentUserId);

            var result = await _userManager.ChangePasswordAsync(currentUser, oldPass, newPAss);

            return Ok();
        }


        [HttpPost]
        //[Route("Login")]
        public async Task<ActionResult> Login(LoginDTO credentials)
        {

            var requiredUser = await _userManager.FindByNameAsync(credentials.Username);

            var isAuth = await _userManager.CheckPasswordAsync(requiredUser, credentials.Password);

            if (!isAuth)
            {
                return Unauthorized();
            }

            var claims = await _userManager.GetClaimsAsync(requiredUser);

            var secretKey = _configuration.GetValue<string>("StoreKey");
            var KeyInBytes = Encoding.ASCII.GetBytes(secretKey);
            var Key = new SymmetricSecurityKey(KeyInBytes);
            var AlgorithmAndKey = new SigningCredentials(Key, SecurityAlgorithms.HmacSha256);

            var expDate = DateTime.Now.AddMinutes(15);

            var myJwt = new JwtSecurityToken(
                claims: claims,
                signingCredentials: AlgorithmAndKey,
                expires: expDate
                );


            var tokenHandler = new JwtSecurityTokenHandler();

            return Ok(new TokenDTO
            {
                Token = tokenHandler.WriteToken(myJwt),
                Message = "sucess",
                Exp = expDate
            });
        }

        

    }
}
