namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateAnalysisTypeModel : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AnalysisTypeModels", "UM", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AnalysisTypeModels", "UM", c => c.Int(nullable: false));
        }
    }
}
