using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESAResturant.NEW.web.Helper
{
    public class Encryptor
    {
        private IDataProtector _dataProtector;
        private IConfiguration _configuration;
        public static string key;

        public Encryptor(IConfiguration configuration, IDataProtectionProvider dataProtector)
        {
            this._configuration = configuration;
            this._dataProtector = dataProtector.CreateProtector("KeyEncryptor");
        }

        public void SetSecurityKey()
        {
            string keyToEncrypt = this._configuration.GetSection("JwtIssuerOptions").GetValue<string>("key");
            key = this._dataProtector.Protect(keyToEncrypt);
        }
    }
}
