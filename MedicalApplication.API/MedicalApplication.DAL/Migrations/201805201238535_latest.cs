namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class latest : DbMigration
    {
        public override void Up()
        {
            //DropColumn("dbo.PatientModels", "IsDeleted");
        }
        
        public override void Down()
        {
            //AddColumn("dbo.PatientModels", "IsDeleted", c => c.Boolean(nullable: false));
        }
    }
}
