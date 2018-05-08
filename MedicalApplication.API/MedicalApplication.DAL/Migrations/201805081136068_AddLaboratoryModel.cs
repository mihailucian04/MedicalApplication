namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLaboratoryModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LaboratoryModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Guid);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.LaboratoryModels");
        }
    }
}
