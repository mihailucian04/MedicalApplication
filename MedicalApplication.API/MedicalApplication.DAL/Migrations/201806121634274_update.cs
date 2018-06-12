namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.LaboratoryModels", "Name", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.LaboratoryModels", "Name");
        }
    }
}
