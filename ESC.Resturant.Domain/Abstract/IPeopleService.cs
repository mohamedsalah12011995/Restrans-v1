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
    public interface IPeopleService
    {
        List<PeopleModel> GetPeoples();
        List<PeopleModel> GetPeoplesByNameOrPhone(string key);

        List<PeopleModel> GetPeoplesByCustomer();
        List<PeopleModel> GetPeoplesBySupplier();
        PeopleModel GetPeopleByid(int id);
        PeopleModel GetLastPeople();
        PeopleModel InsertOrUpdate(PeopleModel PeopleModel);
        bool DeletePeople(int id);
        bool CheckIsPeopleExist(int id);
        List<PeopleTypesModel>  GetAllPeopleTypes();
        List<PeopleCategoriesModel> GetPeopleCategories();

    }
}
