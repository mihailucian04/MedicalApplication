import { Injectable } from '@angular/core';

@Injectable()
export class PermissionsService {
  isMed = localStorage.getItem('user_role') === 'Medic' ? true : false;
  isReg = localStorage.getItem('user_role') === 'RegistryOffice' ? true : false;
  isLab = localStorage.getItem('user_role') === 'LaboratoryAnalysis' ? true : false;
  constructor() { }

}
