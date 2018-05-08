namespace ClassLibrary2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAppointmentModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AppointmentModels",
                c => new
                    {
                        Guid = c.Guid(nullable: false, identity: true),
                        PatientGuid = c.Guid(nullable: false),
                        MedicGuid = c.Guid(nullable: false),
                        Date = c.DateTime(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Guid)
                .ForeignKey("dbo.MedicModels", t => t.MedicGuid, cascadeDelete: true)
                .ForeignKey("dbo.PatientModels", t => t.PatientGuid, cascadeDelete: true)
                .Index(t => t.PatientGuid)
                .Index(t => t.MedicGuid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AppointmentModels", "PatientGuid", "dbo.PatientModels");
            DropForeignKey("dbo.AppointmentModels", "MedicGuid", "dbo.MedicModels");
            DropIndex("dbo.AppointmentModels", new[] { "MedicGuid" });
            DropIndex("dbo.AppointmentModels", new[] { "PatientGuid" });
            DropTable("dbo.AppointmentModels");
        }
    }
}
