using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using WebTestTask.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebTestTask.DataBaseRepositiry;

namespace WebTestTask.Controllers
{
    [BreezeController]
    public class DbController : ApiController
    {
        IRepository repository = RepositoryFactory.Create();


        [HttpGet]
        public string Metadata () {
            return repository.Metadata();
        }

        [HttpGet]
        public IQueryable<User> Users()
        {
            return repository.ReadAll<User>();
        }

        [HttpGet]
        public IQueryable<UserRequest> UserRequests()
        {
            return repository.ReadAll<UserRequest>();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject input)
        {
            return (SaveResult)repository.SaveChanges(input);
        }
    }
}
