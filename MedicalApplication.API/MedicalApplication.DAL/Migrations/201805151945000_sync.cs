namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sync : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PatientModels", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PatientModels", "IsDeleted");
        }
    }
}
