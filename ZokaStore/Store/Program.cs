using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.Context;
using Store.Entities;
using System.Text;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
string AllowCors = "allowAll";
// Add services to the container.
builder.Services.AddControllers().AddNewtonsoftJson(n=>n.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(o=>o.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("StoreDB")));
builder.Services.AddCors(option =>
{
    option.AddPolicy(AllowCors, builder =>
   {
       builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
   });
});
//builder.Services.AddMvc().AddJsonOptions(options => {
//    options.SerializerSettings.MaxDepth = 64;  // or however deep you need
//});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "StoreAdmin";
    options.DefaultChallengeScheme = "StoreAdmin";
})
    .AddJwtBearer("StoreAdmin", options => 
    {
        var secretKey = builder.Configuration.GetValue<string>("StoreKey");
        var keyInBytes = Encoding.ASCII.GetBytes(secretKey);
        var key = new SymmetricSecurityKey(keyInBytes);

        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });


builder.Services.AddIdentity<User, AppRole>(option =>
{
    option.Password.RequireNonAlphanumeric = false;
    option.Password.RequiredLength = 6;
})
    .AddEntityFrameworkStores<StoreContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Assets")),
    RequestPath = "/Assets"
});
app.UseCors(AllowCors);
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
