namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRegistrationModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RegistrationModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        BedCount = c.Int(nullable: false),
                        DepartmentGuid = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.DepartmentModels", t => t.DepartmentGuid, cascadeDelete: true)
                .Index(t => t.DepartmentGuid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RegistrationModels", "DepartmentGuid", "dbo.DepartmentModels");
            DropIndex("dbo.RegistrationModels", new[] { "DepartmentGuid" });
            DropTable("dbo.RegistrationModels");
        }
    }
}
