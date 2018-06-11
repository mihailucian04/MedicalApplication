namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedMappingMedicAnalysisModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MappingMedicAnalysisModel", "Result", c => c.String());
            DropColumn("dbo.AnalysisTypeModels", "Result");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AnalysisTypeModels", "Result", c => c.String());
            DropColumn("dbo.MappingMedicAnalysisModel", "Result");
        }
    }
}
