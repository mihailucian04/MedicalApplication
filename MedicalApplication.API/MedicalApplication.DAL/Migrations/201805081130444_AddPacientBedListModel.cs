namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPacientBedListModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PacientBedListModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        PatientGuid = c.Guid(nullable: false),
                        BedGuid = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.BedModels", t => t.BedGuid, cascadeDelete: true)
                .ForeignKey("dbo.PatientModels", t => t.PatientGuid, cascadeDelete: true)
                .Index(t => t.PatientGuid)
                .Index(t => t.BedGuid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PacientBedListModels", "PatientGuid", "dbo.PatientModels");
            DropForeignKey("dbo.PacientBedListModels", "BedGuid", "dbo.BedModels");
            DropIndex("dbo.PacientBedListModels", new[] { "BedGuid" });
            DropIndex("dbo.PacientBedListModels", new[] { "PatientGuid" });
            DropTable("dbo.PacientBedListModels");
        }
    }
}
