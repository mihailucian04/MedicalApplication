namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddHospitalSalonModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HospitalSalonModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        Number = c.Int(nullable: false),
                        DepartmentGuid = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.DepartmentModels", t => t.DepartmentGuid, cascadeDelete: true)
                .Index(t => t.DepartmentGuid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.HospitalSalonModels", "DepartmentGuid", "dbo.DepartmentModels");
            DropIndex("dbo.HospitalSalonModels", new[] { "DepartmentGuid" });
            DropTable("dbo.HospitalSalonModels");
        }
    }
}
