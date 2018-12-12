namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OtherDetailsAddedOnPatientModel1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PatientModels", "OtherDetails", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.PatientModels", "OtherDetails");
        }
    }
}
