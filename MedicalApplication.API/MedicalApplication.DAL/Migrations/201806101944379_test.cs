namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            //DropTable("dbo.AnalysisTypeModels");
            //DropTable("dbo.MappingMedicAnalysisModels");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.MappingMedicAnalysisModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        MedicGuid = c.Guid(nullable: false),
                        PatientGuid = c.Guid(nullable: false),
                        LaboratoryGuyGuid = c.Guid(nullable: false),
                        ProcessAnalysisDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Guid);
            
            CreateTable(
                "dbo.AnalysisTypeModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        Name = c.String(),
                        Result = c.String(),
                        UM = c.Int(nullable: false),
                        Type = c.Boolean(nullable: false),
                        RangeValue = c.String(),
                    })
                .PrimaryKey(t => t.Guid);
            
        }
    }
}
