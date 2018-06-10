namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AnalusisTypeModel : DbMigration
    {
        public override void Up()
        {
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
        
        public override void Down()
        {
            DropTable("dbo.AnalysisTypeModels");
        }
    }
}
