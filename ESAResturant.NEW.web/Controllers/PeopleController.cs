using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESC.Resturant.Data.Entities;
using ESC.Resturant.Domain.Abstract;
using ESC.Resturant.Domain.Concrete;
using ESC.Resturant.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESAResturant.NEW.web.Controllers
{
    [Route("api/People")]
    public class PeopleController : Controller
    {
        private IPeopleService PeopleService;
        public PeopleController(IPeopleService _PeopleService)
        {
            PeopleService = _PeopleService;
        }
        // GET: api/People
        [HttpGet]
        [Route("GetPeoples")]
        public IEnumerable<PeopleModel> GetAllPeoples()
        {
            return PeopleService.GetPeoples().ToList();
        }


        [HttpGet]
        [Route("GetPeoplesByNameOrPhone")]
        public IEnumerable<PeopleModel> GetAllPeoplesByPhoneOrKey(string key)
       {
            return PeopleService.GetPeoplesByNameOrPhone(key);
        }

        [HttpGet]
        [Route("GetLastPeople")]
        public PeopleModel GetLastPeople()
        {
            return PeopleService.GetLastPeople();
        }

        // GET: api/People/5
        [HttpGet]
        [Route("GetPeoplesById")]
        public PeopleModel GetPeopleById(int id)
        {
            return PeopleService.GetPeopleByid(id);
        }

        // POST: api/People
        [HttpPost]
        [Route("InsertOrUpdatePeople")]
        public async Task<PeopleModel> PostAsync([FromBody] PeopleModel PeopleModel)
        {
            var b =  PeopleService.InsertOrUpdate(PeopleModel);
            return b;
        }


        [HttpDelete]
        [Route("DeletePeople")]
        public void Delete(int id)
        {
            PeopleService.DeletePeople(id);
        }



        [HttpGet]
        [Route("GetPeopleTypes")]
        public IEnumerable<PeopleTypesModel> GetPeopleTypes( )
        {
            return PeopleService.GetAllPeopleTypes().ToList();
        }


        [HttpGet]
        [Route("GetPeopleCategories")]
        public IEnumerable<PeopleCategoriesModel> GetPeopleCategories( )
        {
            return PeopleService.GetPeopleCategories().ToList();
        }

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    PeopleService.DeletePeople(id);
        //}
    }
}
