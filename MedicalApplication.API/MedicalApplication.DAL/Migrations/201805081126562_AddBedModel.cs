namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBedModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BedModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        BedNumber = c.Int(nullable: false),
                        Status = c.Boolean(nullable: false),
                        HospitalSalonGuid = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.HospitalSalonModels", t => t.HospitalSalonGuid, cascadeDelete: true)
                .Index(t => t.HospitalSalonGuid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BedModels", "HospitalSalonGuid", "dbo.HospitalSalonModels");
            DropIndex("dbo.BedModels", new[] { "HospitalSalonGuid" });
            DropTable("dbo.BedModels");
        }
    }
}
