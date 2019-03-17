using WebTestTask.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebTestTask.Model
{
    public class DataBaseContext : DbContext
    {

        public DataBaseContext() : base("DbConnection") { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }

        static DataBaseContext()
        {
            Database.SetInitializer<DataBaseContext>(new MigrateDatabaseToLatestVersion<DataBaseContext, Configuration>());
        }
    }
}