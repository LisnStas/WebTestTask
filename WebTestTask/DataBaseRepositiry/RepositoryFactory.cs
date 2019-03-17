using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebTestTask.DataBaseRepositiry
{
    public static class RepositoryFactory
    {
        public static IRepository Create()
        {
            Repository repository = new Repository();
            return repository;
        }
    }
}