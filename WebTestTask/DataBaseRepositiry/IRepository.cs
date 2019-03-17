using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebTestTask.DataBaseRepositiry
{
    public interface IRepository
    {

        string Metadata();

        IQueryable<T> ReadAll<T>();

        object SaveChanges(JObject input);

    }
}
