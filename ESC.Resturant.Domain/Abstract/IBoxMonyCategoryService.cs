using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ESC.Resturant.Domain.Abstract
{
    /// <summary>
    /// IBillService interface 
    /// Define Methods Signture 
    /// </summary>
    public interface IBoxMonyCategoryService
    {
        List<BoxMonyCategoriesModel> GetBoxMonyCategories();
        List<BoxMonyTypeModel> GetBoxMonyType();
        BoxMonyCategoriesModel GetBoxMonyCategoryByid(int id);
        BoxMonyCategoriesModel InsertOrUpdate(BoxMonyCategoriesModel boxMonyCategoryModel);
        bool DeleteBoxMonyCategory(int id);
        bool CheckIsBoxMonyCategoryExist(int id);

    }
}
