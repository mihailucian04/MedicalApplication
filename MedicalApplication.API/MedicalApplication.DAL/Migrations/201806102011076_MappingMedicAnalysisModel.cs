namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MappingMedicAnalysisModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MappingMedicAnalysisModel",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        MedicGuid = c.Guid(nullable: false),
                        PatientGuid = c.Guid(nullable: false),
                        AnalysisTypeGuid = c.Guid(nullable: false),
                        LaboratoryGuyGuid = c.Guid(nullable: true),
                        ProcessAnalysisDate = c.DateTime(nullable: true),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.AnalysisTypeModels", t => t.AnalysisTypeGuid, cascadeDelete: true)
                .ForeignKey("dbo.MedicModels", t => t.MedicGuid, cascadeDelete: true)
                .ForeignKey("dbo.PatientModels", t => t.PatientGuid, cascadeDelete: true)
                .Index(t => t.MedicGuid)
                .Index(t => t.PatientGuid)
                .Index(t => t.AnalysisTypeGuid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MappingMedicAnalysisModel", "PatientGuid", "dbo.PatientModels");
            DropForeignKey("dbo.MappingMedicAnalysisModel", "MedicGuid", "dbo.MedicModels");
            DropForeignKey("dbo.MappingMedicAnalysisModel", "AnalysisTypeGuid", "dbo.AnalysisTypeModels");
            DropIndex("dbo.MappingMedicAnalysisModel", new[] { "AnalysisTypeGuid" });
            DropIndex("dbo.MappingMedicAnalysisModel", new[] { "PatientGuid" });
            DropIndex("dbo.MappingMedicAnalysisModel", new[] { "MedicGuid" });
            DropTable("dbo.MappingMedicAnalysisModel");
        }
    }
}
