import { Province } from './Province';
import { Amphur } from './Amphur';
import { Distict } from './distict';

export class ZipCode{
    districtModel: string;
	zipcode: string;
	
	listProvince: Province[];
	listAmphure: Amphur[];
	listDitrict: Distict[];
}