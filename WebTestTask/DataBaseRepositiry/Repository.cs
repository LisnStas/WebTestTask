using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using Breeze.ContextProvider.EF6;
using WebTestTask.Model;

namespace WebTestTask.DataBaseRepositiry
{
    public class Repository : IRepository
    {
        private EFContextProvider<DataBaseContext> context = new EFContextProvider<DataBaseContext>();

        public string Metadata()
        {
            return context.Metadata();
        }

        public IQueryable<T> ReadAll<T>()
        {
            if (typeof(T).Equals(typeof(User)))
            {
                return (IQueryable<T>)context.Context.Users;
            }
            if (typeof(T).Equals(typeof(UserRequest)))
            {
                return (IQueryable<T>)context.Context.UserRequests;
            }
            return null;
        }

        public object SaveChanges(JObject input)
        {
            return context.SaveChanges(input);
        }
    }
}