using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MDWM.Infrastructure;
using MDWM.Infrastructure.Warehouses;
using MDWM.Infrastructure.Shared;
using MDWM.Infrastructure.Deliveries;
using MDWM.Domain.Shared;
using MDWM.Domain.Warehouses;
using MDWM.Domain.Deliveries;

namespace MDWM
{
    public class Startup
    {
        private readonly string _policyName = "CorsPolicy";
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MDWMDbContext>(opt =>
                //opt.UseInMemoryDatabase("MDWMDB")
                opt.UseSqlServer("Password=x96ovSTxyQ==Xa5;Persist Security Info=True;User ID=sa;Initial Catalog=master;Data Source=vsgate-s1.dei.isep.ipp.pt,10414;")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
            
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200/")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            ConfigureMyServices(services);
            

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseCors(_policyName);

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseCors(builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            services.AddTransient<IWarehouseRepository,WarehouseRepository>();
            services.AddTransient<WarehouseService>();

            services.AddTransient<IDeliveryRepository,DeliveryRepository>();
            services.AddTransient<DeliveryService>();
        }
    }
}
