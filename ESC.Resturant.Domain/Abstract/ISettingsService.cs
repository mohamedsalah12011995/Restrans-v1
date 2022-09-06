using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    public interface ISettingsService
    {
        List<SettingsModel> GetSettings();
        SettingsModel GetSettingsByid(int id);
        SettingsModel InsertOrUpdate(SettingsModel SettingsModel);
        bool DeleteSettings(int id);
        bool CheckIsSettingsExist(int id);
    }
}
