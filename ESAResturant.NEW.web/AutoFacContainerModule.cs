using Autofac;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Abstract;

using Microsoft.AspNetCore.Http;

namespace ESCResturant.NEW.web
{
    public class AutoFacContainerModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterType<EmailSender>().As<IEmailSender>();
       
            //for  register all interfaces for all services 
            builder.RegisterAssemblyTypes(typeof(PrinterService).Assembly).AsImplementedInterfaces();

            //builder.RegisterType<JwtFactory>().As<IJwtFactory>().SingleInstance();

            builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>().InstancePerLifetimeScope();
            
        }
    }
}