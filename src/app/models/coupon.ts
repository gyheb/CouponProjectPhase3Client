import { CategoryType } from './category-type';
import { Company } from './company';
import { Customer } from './customer';

export class Coupon {

    constructor(
        public couponId:number,
        public company:Company,
        public type:CategoryType,
        public title:string,
        public description:string,
        public startDate:Date,
        public endDate:Date,
        public amount:number,
        public price:number,
        public image:string,
        public customers:Customer[]
    ){}
}
