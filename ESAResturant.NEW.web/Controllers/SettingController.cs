using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/Setting")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private ISettingsService SettingsService;

        public SettingController(ISettingsService _SettingsService)
        {
            SettingsService = _SettingsService;
        }
        // GET: api/Setting
        [HttpGet]
        [Route("GetSettings")]
        public IEnumerable<SettingsModel> GetSettings()
        {
            return SettingsService.GetSettings();
        }

        // GET: api/Setting/5
        [HttpGet]
        [Route("GetSettingbyId")]
        public SettingsModel GetSettingByid(int id)
        {
            return SettingsService.GetSettingsByid(id);
        }


        // POST: api/InsertOrUpdateSetting
        [HttpPost]
        [Route("InsertOrUpdateSetting")]
        public void Post([FromBody] SettingsModel SettingModelModel)
        {
            SettingsService.InsertOrUpdate(SettingModelModel);
        }


        [HttpDelete]
        [Route("DeleteSettings")]
        public void Delete(int id)
        {
            SettingsService.DeleteSettings(id);
        }

    }
}