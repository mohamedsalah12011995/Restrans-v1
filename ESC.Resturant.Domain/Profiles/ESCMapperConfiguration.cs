using AutoMapper;
using ESC.Resturant.Domain.Profiles;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESA.Domain.Profiles
{

    /// <summary>
    /// this class do magic for add automapper profiles to project dependency  services 
    /// </summary>
    public class ESCMapperConfiguration
    {
        static IList<Profile> profiles;
        static ESCMapperConfiguration()
        {
            profiles = new List<Profile>();
        }
        
        public static void ConfigMapper(Microsoft.Extensions.DependencyInjection.IServiceCollection services)
        {
            // Auto Mapper Configurations
            var mappingConfig = new MapperConfiguration(mc =>
            {
                var profileType = typeof(Profile);
                var allProfiles = typeof(PrinterProfile).Assembly.GetTypes()
                    .Where(p => profileType.IsAssignableFrom(p) && !p.IsInterface && !p.IsAbstract)
                      .Select(x => (Profile)Activator.CreateInstance(x));
                
                foreach (var profileInstance in allProfiles)
                {
                    mc.AddProfile(profileInstance);
                }
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}
