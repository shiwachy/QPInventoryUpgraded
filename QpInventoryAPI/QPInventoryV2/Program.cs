using Microsoft.EntityFrameworkCore;
using QPInventoryV2.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddDbContext<QpinventoryUpgradeContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("con_str"));

});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowInventoryCors",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader().AllowAnyMethod()
                          .SetIsOriginAllowedToAllowWildcardSubdomains();
                      });
   
});
var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors("allowInventoryCors");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
